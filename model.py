"""Models for Packing App"""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    """ A generic list item"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)   ## hash this 

    lists = db.relationship('List', back_populates='user')


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class List_category(db.Model):
    """ A list category """

    __tablename__ = 'list_categories'

    cat_id = db.Column(db.Integer,
                    autoincrement=True,
                    primary_key=True,
                    nullable=False)
    name = db.Column(db.String, nullable=False)

    lists = db.relationship('List', back_populates='category')


    def __repr__(self):
        return f'<List_category cat_id={self.cat_id} name={self.name}>'



class List(db.Model):
    """ A list """

    __tablename__ = 'lists'

    list_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        nullable=False)
    name = db.Column(db.String, nullable=False)
    cat_id = db.Column(db.Integer, db.ForeignKey('list_categories.cat_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    
    category = db.relationship('List_category', back_populates='lists')
    items = db.relationship('Item', secondary='list_items', back_populates='lists')
    user = db.relationship('User', back_populates="lists")
    
    def __repr__(self):
        return f'<List list_id={self.list_id} name={self.name}>'



class Item(db.Model):
    """ A generic list item"""

    __tablename__ = 'items'

    item_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        nullable=False)
    name = db.Column(db.String, nullable=False)
    cat_id = db.Column(db.Integer, db.ForeignKey('item_categories.cat_id'), nullable=False)
    
    item_category = db.relationship('Item_category',
                                    back_populates='items')
    lists = db.relationship('List', 
                            secondary='list_items',
                            back_populates='items')
    gear = db.relationship('Gear', 
                            secondary='list_items',
                            back_populates='items')
    

    def __repr__(self):
        return f'<List_item item_id={self.item_id} name={self.name}>'


class List_item(db.Model):
    """relational table between lists, items and gear"""
    
    __tablename__ = 'list_items'

    list_item_id = db.Column(db.Integer,
                                autoincrement=True,
                                primary_key=True,
                                nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.list_id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.item_id'))
    gear_id = db.Column(db.Integer, db.ForeignKey('gear.gear_id'))

    lists = db.relationship('List')
    items = db.relationship('Item')
    
    def __repr__(self):
        return f'<List_item_rel item_id={self.list_item_rel_id}>'


class Item_category(db.Model):
    """ List item category """

    __tablename__ = 'item_categories'

    cat_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        nullable=False)
    name = db.Column(db.String, nullable=False)

    items= db.relationship('Item', back_populates='item_category')
    

    def __repr__(self):
        return f'<Item_category cat_id={self.cat_id} name={self.name}>'


class Gear(db.Model):
    """ A piece of gear """

    __tablename__ = 'gear'

    gear_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        nullable=False)
    name = db.Column(db.String, nullable=False)
    weight = db.Column(db.Integer)
    description = db.Column(db.Text)  
    img = db.Column(db.String)

    items = db.relationship('Item', 
                            secondary='list_items',
                            back_populates='gear')

    def __repr__(self):
        return f'<Gear gear_id={self.gear_id} name={self.name}>'


def connect_to_db(flask_app, db_uri='postgresql:///packme', echo=True):  #naming convention 
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to DB')


if __name__ == '__main__':
    from server import app
    connect_to_db(app)