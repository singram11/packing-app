"""CRUD operations"""

from model import (db, User, List_category, List, List_item, Item_category, 
                   List_item_rel, Gear_item, Gear, connect_to_db)


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

def get_list_item_cat_by_name(name):
    """Take in category name and return obj"""

    category = db.session.query(Item_category).filter(Item_category.name==name).one()

    return category

def get_list_cat_by_name(name):
    """Take in category name and return obj"""

    category = db.session.query(List_category).filter(List_category.name==name).one()

    return category

def create_list_item(name, category):
    """Add a list item to a list"""

    cat_obj = get_list_item_cat_by_name(category)

    item_cat_id = cat_obj.cat_id

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

# def add_item_to_list(list_obj, list_item):
#     """Check if the item exists, create the item, 
#     and return list_item_relationship"""

   
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

def get_user_object(email):
    """Return user object based on email"""

    user = db.session.query(User).filter(User.email == email).one()
    
    return user

def get_lists_by_user(user):
    """Get list of lists by user

    Takes in a user object and returns a list 
    of list objects"""

    user_id = user.user_id
    lists = db.session.query(List).filter(List.user_id==user_id).all()

    return lists

def get_list_items_by_id(list_id):
    """Return a list of items by list 
     
     takes in a list object 
     returns a list of item objects"""

    
    # list_items = db.session.query(List_item).filter(list_id_test==list_id).all()
    list_items = (db.session.query(List_item)
                .join(List_item_rel).join(List)
                .filter(List.list_id ==list_id).all())

    return list_items 

def get_gear_by_user(user):
    """Return unique list of gear by user"""

    user_id = user.user_id
   
    gear_items = (db.session.query(Gear_item)
                .join(List_item).join(List_item_rel).join(List).join(User)
                .filter(User.user_id==user_id).all())

    user_gear = set()

    for item in gear_items:
        print(item.gear)
        user_gear.add(item.gear)

    return user_gear

def get_gear_by_id(gear_id):
    """Get gear by id# 

    take in num and return gear obj"""

    gear = db.session.query(Gear).filter(Gear.gear_id==gear_id).one()

    return gear

def get_list_by_id(list_id):
    """Get list by list id

    takes in integer, returns list object"""

    list_obj = db.session.query(List).filter(List.list_id==list_id).one()

    return list_obj

if __name__ == '__main__':
    from server import app
    connect_to_db(app)