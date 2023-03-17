from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cs447hw2.db'

db = SQLAlchemy(app)

class personObj(object):
    pass

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # id_num = db.Column(db.Integer)
    name = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Item %r>' % self.id
        # return f'[{\'id\':{self.id},\'name\':{self.name},\'points\':{self.points}}]'

@app.route('/', methods=['POST', 'GET'])
def index():
        
    return render_template('index.html')

@app.route('/readall', methods=['POST', 'GET'])
def readall():
    
        people = Person.query.order_by(Person.id).all()
        print("Got the people ordered")
        print(people)
        print(len(people))
        people_string = "["
        i = 1
        for person in people:
            print(person.id, person.name, person.points)
            people_string += "{\"id\":"+str(person.id) + ", \"name\":\""+person.name+"\", \"points\":"+str(person.points)+"}"
            if i<len(people):
                people_string += ","
                i = i + 1

        people_string += "]"
        # return people
        print(people_string)
        return people_string

@app.route('/delete')
def delete():
    id = request.args.get('id')
    print("deleting id: "+ str(id))
    person_to_delete = Person.query.get_or_404(id)
    print("deleted id: "+ id)
    try:
        db.session.delete(person_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/create')
def create():
    person_name = request.args.get('name')
    person_points = request.args.get('points')
    person_id = request.args.get('id')
    new_person = Person( id=person_id, name=person_name,points=person_points)
    try:
        db.session.add(new_person)
        db.session.commit()
        return redirect('/')
    except:
        return "we failed to create a new person"


if __name__ == "__main__":
    app.run(debug=True)