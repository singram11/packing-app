"""CRUD operations"""

from model import (db, User, List_category, List, List_item, Item_category, 
                   List_item_rel, Gear_item, Gear)


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
    """Create a new list

    take in a user object, list name as a string 
    and category as an object 

    returns the new list object"""

    user_id = user.user_id
    #need to figure out how to handle if a category doesnt exist

    new_list = List(user_id=user_id, name=name, category=category)

    db.session.add(new_list)
    db.session.commit()

    return new_list
    

def create_item_category(name):
    """Create list item category 

    takes in only a category name"""

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

def add_item_to_list(list_obj, list_item):
    """Check if the item exists, create the item, 
    and return list_item_relationship"""

   
    # count = db.session.query(List_item).filter(List_item.name== item_name).all()
    # print(count)
    #check if item existist 
    # if db.session.query(List_item).filter(List_item.name== 'item_name').count() == 0:
    #     #this wont work now without a cateogry 
    #     new_item = create_list_item(item_name)
    # else:
    #     list_item = db.session.query(List_item).filter(List_item == 'item_name').one()
    #     rel = create_list_item_relationship(list_obj, list_item)

    # return rel
     

def create_gear(name, weight, description, img):
    """Create and retrurn new piece of gear"""

    gear = Gear(name=name, weight=weight, description=description, img=img)

    db.session.add(gear)
    db.session.commit()

    return gear

def associate_gear_to_item(gear, list_item):
    """Create a relationship between gear and list item

    takes in a list_item and gear object and returns a 
    gear_item relationship object"""

    gear_id = gear.gear_id
    item_id = list_item.item_id

    gear_item_rel = Gear_item(gear_id=gear_id, item_id=item_id)

    db.session.add(gear_item_rel)
    db.session.commit()

    return gear_item_rel


