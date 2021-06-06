"""CRUD operations"""

from model import (db, User, List_category, List, List_item, Item_category,
                   Gear_item, Gear)


def create_user(fname, lname,email, password):
    """Create and return a new user"""

    user = User(fname=fname, lname=lname, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_list_category(name):
    """Create and return a new list category"""

    category = List_category(name=name)

    db.session.add(category)
    db.session.commit()
    
    return category


def create_item_category(name):

    category = Item_category(name=name)

    db.session.add(category)
    db.session.commit()
    
    return category


def create_list_item(name):
    """Create and return a new list item"""

    list_item = List_item(name=name)
    
    db.session.add(list_item)
    db.session.commit()

    return list_item

def create_gear(name, weight, description, img):
    """Create and retrurn new piece of gear"""

    gear = Gear(name=name, weight=weight, description=description, img=img)

    db.session.add(gear)
    db.session.commit()

    return gear

def get_gear_by_user(user):
    """Return a list of gear objects by user""" 

    

def associate_gear_to_list_item(gear, list_item):  #gear, #list
    """Takes in gear object and list_item object and creates an association"""
    
    pass

