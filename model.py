"""Models for Packing App"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_to_db(flask_app, db_uri='postgresql:///[NAME OF DB HERE]', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to DB')


class User(db.Model):
    """ A generic list item"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'




class List_category(db.Model):
    """ A list category """

    __tablename__ = 'list_categories'

    cat_id = db.Column(db.Integer,
                    autoincrement=True,
                    primary_key=True)
    name = db.Column(db.String)

     def __repr__(self):
        return f'<List_category cat_id={self.cat_id} name={self.name}>'



class List(db.Model):
    """ A list """

    __tablename__ = 'lists'

    list_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)

     def __repr__(self):
        return f'<List list_id={self.list_id} name={self.name}>'



class List_item(db.Model):
    """ A generic list item"""

    __tablename__ = 'list_items'

    item_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)

     def __repr__(self):
        return f'<List_item item_id={self.item_id} name={self.name}>'



class Item_category(db.Model):
    """ List item category """

    __tablename__ = 'item_categories'

    cat_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)

     def __repr__(self):
        return f'<Item_category cat_id={self.item_id} name={self.name}>'



class Gear_item(db.Model):
    """ Relational table for gear and items """

    __tablename__ = 'gear_items'

    gearitem_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
   

     def __repr__(self):
        return f'<Gear_item gearitem_id={self.gearitem_id} >'



class Gear(db.Model):
    """ A piece of gear """

    __tablename__ = 'gear'

    gear_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)
    weight = db.Column(db.Integer)
    description = db.Column(db.textarea)  #fix this
    img = db.Column(db.String)


     def __repr__(self):
        return f'<Gear gear_id={self.gear_id} name={self.name}>'
