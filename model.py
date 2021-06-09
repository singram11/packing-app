"""Models for Packing App"""

## get error - is that an issue


from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_to_db(flask_app, db_uri='postgresql:///packme', echo=True):  #naming convention 
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
    password = db.Column(db.String)   ## hash this 

    lists = db.relationship('List')


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class List_category(db.Model):
    """ A list category """

    __tablename__ = 'list_categories'

    cat_id = db.Column(db.Integer,
                    autoincrement=True,
                    primary_key=True)
    name = db.Column(db.String)

    lists = db.relationship('List')


    def __repr__(self):
        return f'<List_category cat_id={self.cat_id} name={self.name}>'



class List(db.Model):
    """ A list """

    __tablename__ = 'lists'

    list_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)
    cat_id = db.Column(db.Integer, db.ForeignKey('list_categories.cat_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    
    category = db.relationship('List_category')
    list_item_rel = db.relationship('List_item_rel')
    user = db.relationship('User')
    #why do we do both?

    def __repr__(self):
        return f'<List list_id={self.list_id} name={self.name}>'



class List_item(db.Model):
    """ A generic list item"""

    __tablename__ = 'list_items'

    item_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)
    cat_id = db.Column(db.Integer, db.ForeignKey('item_categories.cat_id'))

    item_category = db.relationship('Item_category')
    list_item_rel = db.relationship('List_item_rel')
    

    def __repr__(self):
        return f'<List_item item_id={self.item_id} name={self.name}>'

class List_item_rel(db.Model):
    """relational table between lists and list_items"""
    
    __tablename__ = 'list_item_rels'

    list_item_rel_id = db.Column(db.Integer,
                                autoincrement=True,
                                primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.list_id'))
    item_id = db.Column(db.Integer, db.ForeignKey('list_items.item_id'))

    lists = db.relationship('List')
    list_items = db.relationship('List_item')

class Item_category(db.Model):
    """ List item category """

    __tablename__ = 'item_categories'

    cat_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String)

    items= db.relationship('List_item')

    def __repr__(self):
        return f'<Item_category cat_id={self.cat_id} name={self.name}>'



class Gear_item(db.Model):
    """ Relational table for gear and items """

    __tablename__ = 'gear_items'

    gearitem_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    gear_id = db.Column(db.Integer, db.ForeignKey('gear.gear_id'))
    item_id = db.Column(db.Integer, db.ForeignKey('list_items.item_id'))
   
    gear = db.relationship('Gear')
    items = db.relationship('List_item')

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
    description = db.Column(db.Text)  #fix this
    img = db.Column(db.String)

    gear_items = db.relationship('Gear_item')

    def __repr__(self):
        return f'<Gear gear_id={self.gear_id} name={self.name}>'
