import random
import tornado.web
import tornado.ioloop
import tornado.websocket

question =[['Santa claus', 'Snow maiden', 'Snowman', 'Deer', 'Elf', 'Snowflake'],
           ['at the North Pole', 'in the city', 'in the chimney', 'in a puddle', 'in front of the child', 'on the grass'],
           ['the day before the new year', 'January 1 morning', 'January 1 morning', 'in summer', 'in the middle of the day', 'in the middle of the day'],
           ['drank tea', 'in the city', 'shrouded the ground in snow', 'fell into the chimney', 'wished you a happy new year', 'looked at the map'],
           ['and trumpeted: "yo-ho-ho !!!"', 'and squeaked: "pee-pee ...."', 'and said in surprise: "OH"', 'and said: "And here is a present for you"', 'and shouted: "Happy New Year!"', 'and sang: "Stand up, children, stand in a circle .."']]
i=-1
key="next"
stop="stop"

def get_word():
    global i
    i+=1
    return random.choice(question[i])

def get_bye(wh):
    wh.write_message("End of the game")

class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        self.write_message(get_word())
        print("WebSocket opened")

    def on_message(self, message):
        if message==key: 
          phrase=get_word()
          self.write_message(phrase)
        elif message==stop:
          get_bye(self)

    def on_close(self):
        print("WebSocket closed")
    
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('hw-12.html')

application = tornado.web.Application([
    (r'/', MainHandler),
    (r'/ws', WSHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': 'static'})
])

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8080)
    tornado.ioloop.IOLoop.instance().start()