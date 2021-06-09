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

def create_list(user, name, category):

    user_id = user.user_id
    #need to figure out how to handle if a category doesnt exist

    new_list = List(user_id=user_id, name=name, category=category)

    return new_list

def create_item_category(name):

    category = Item_category(name=name)

    db.session.add(category)
    db.session.commit()
    
    return category



def create_list_item(name, item_cat):
    """Add a list item to a list"""

    item_cat_id = item_cat.cat_id

    new_item = List_item(name=name, cat_id=item_cat_id)
    
    db.session.add(new_item)
    db.session.commit()

    return new_item

def create_list_item_relationship(list_obj, list_item):
    """Create a list_item_relationship
    
    Takes in list and list_item objects creates list_item_rels
    object and returns that object"""

    list_id = list_obj.list_id
    item_id = list_item.item_id

    list_item_rel = List_item_rel(list_id=list_id, item_id=item_id)
    
    db.session.add(list_item_rel)
    db.session.commit()

    return list_item_rel

def add_item_to_list(list, list_item):
    """Check if the item exists, create the item, 
    and return list_item_relationship"""

    #check if item existist 
        # if not create
    #create list / item relationship

def create_gear(name, weight, description, img):
    """Create and retrurn new piece of gear"""

    gear = Gear(name=name, weight=weight, description=description, img=img)

    db.session.add(gear)
    db.session.commit()

    return gear

# def get_gear_by_user(user):
#     """Return a list of gear objects by user""" 




