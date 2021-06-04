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


# class List_category(db.Model):
#     """ A list category """

#     __tablename__ = List_categories

#     cat_id = db.Column( )