from bs4 import BeautifulSoup
from lxml import html
import requests
import datetime

url='https://inbicst.ru/'

months = {
    'января': 1,
    'февраля': 2,
    'марта': 3,
    'апреля': 4,
    'мая': 5,
    'июня': 6,
    'июля': 7,
    'августа': 8,
    'сентября': 9,
    'октября': 10,
    'ноября': 11,
    'декабря': 12
}

def date(d_mm, h_m):
    y = datetime.datetime.today().year

    d, mm= d_mm.split(' ')
    d = int(d)
    mm = months[mm]

    m_t = datetime.datetime.today().month
    if mm>m_t:
        y-=1
    
    h, m = h_m.split(':')
    h=int(h)
    m=int(m)

    date = datetime.datetime(y,mm,d,h,m)

    return date

def get_news():
    news = []
    site = requests.get(url)
    soup = BeautifulSoup(site.text)
    articles = soup.find('section', {'class': 'section-news'}).find_all('article')
    
    for article in articles:
        d_mm = article.find('header').find('div').find('h2').text
        h_m = article.find('header').find('div').find('div').text
        date_news=date(d_mm, h_m)
        
        text_news = article.find('div', {'class': 'content'}).text
        
        news += [[date_news, text_news]]
        
    return news

def print_news():
    i=1
    news=get_news()
    print("News:\n")

    for n in news:   
        print("%d) "%(i),n[0],n[1],"\n")
        i+=1

print_news()
