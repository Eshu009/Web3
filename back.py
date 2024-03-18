from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room, send

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']
    join_room(room)
    send({'msg': 'Joined the room'}, room=room)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data['room']
    leave_room(room)
    send({'msg': 'Left the room'}, room=room)

@socketio.on('send_message')
def handle_message(data):
    room = data['room']
    send({'msg': data['msg']}, room=room)

if __name__ == '__main__':
    socketio.run(app, debug=True)
