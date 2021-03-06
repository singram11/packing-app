"""CRUD operations"""

from model import (
    db,
    User,
    List_category,
    List,
    List_item,
    Item_category,
    Item,
    Gear,
    connect_to_db,
)


def create_user(fname, lname, email, password):
    """Create and return a new user"""

    user = User(fname=fname, lname=lname, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_new_account(fname, lname, email, password):
    """Check for existing user and then create user if none exists

    take in fname, lname, email, password

    return user object"""

    existing_user = get_user_by_email(email)

    response_message = {}

    if existing_user:
        response_message["success"] = False
        response_message["message"] = "This user already exists."
        user = None
    else:
        user = create_user(fname, lname, email, password)
        response_message["success"] = True
        response_message["message"] = "This user was created."

    return (response_message, user)


def get_user_by_email(email):
    """Find user object by email"""

    user = db.session.query(User).filter(User.email == email).first()

    return user


def create_list_category(name):
    """Create and return a new list category

    takes in a string as the name and returns the object"""

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

    new_list = List(user_id=user_id, name=name, category=category)

    db.session.add(new_list)
    db.session.commit()

    return new_list


def create_item_category(name):
    """Create item category

    takes in a string and returns a category obj"""

    category = Item_category(name=name)

    db.session.add(category)
    db.session.commit()

    return category


def get_list_item_cat_by_name(name):
    """Take in category name and return obj"""

    category = (
        db.session.query(Item_category).filter(Item_category.name == name).first()
    )

    return category


def get_list_cat_by_name(name):
    """Take in category name and return obj"""

    category = (
        db.session.query(List_category).filter(List_category.name == name).first()
    )

    return category


def create_item(name, category):
    """Add a list item to a list

    takes in a string as the name and category

    returns an item object"""

    cat_obj = get_list_item_cat_by_name(category)

    if not cat_obj:
        cat_obj = create_item_category(category)

    item_cat_id = cat_obj.cat_id

    new_item = Item(name=name, cat_id=item_cat_id)

    db.session.add(new_item)
    db.session.commit()

    return new_item


def create_list_item(list_obj, item_obj):
    """Create a list_item_relationship

    Takes in list and list_item objects creates list_item
    object and returns that object"""

    list_id = list_obj.list_id
    item_id = item_obj.item_id

    list_item = List_item(list_id=list_id, item_id=item_id)

    db.session.add(list_item)
    db.session.commit()

    return list_item


def create_gear(name, weight=None, description=None, img=None):
    """Create and retrurn new piece of gear"""

    gear = Gear(name=name, weight=weight, description=description, img=img)

    db.session.add(gear)
    db.session.commit()

    return gear


def add_item_to_list(list_id, item_name, cat_name):
    """Add an item to a specified list

    Check for existing item,
    create new item if needed,
    associate item to list

    return list_item object"""

    item_obj = get_item_by_name_and_cat(item_name, cat_name)

    if not item_obj:
        print("making new object")
        item_obj = create_item(item_name, cat_name)

    list_obj = get_list_by_id(list_id)

    list_item = create_list_item(list_obj, item_obj)

    return list_item.json_format()


def add_gear_to_item(gear, list_item):
    """Add gear to a list_item

    takes in a list_item and gear object"""

    gear_id = gear.gear_id
    item_id = list_item.item_id

    list_item.gear_id = gear_id

    db.session.commit()

    return list_item.gear_id


def get_user_object(email):
    """Return user object based on email"""

    user = db.session.query(User).filter(User.email == email).one()

    return user


def get_lists_by_user(user):
    """Get list of lists by user

    Takes in a user object and returns a list
    of list objects"""

    user_id = user.user_id
    lists = db.session.query(List).filter(List.user_id == user_id).all()

    return lists


def get_item_by_name_and_cat(name, category_name):
    """Check if there is an item by name

    return item object if it exists
    return none if no object by that name"""

    category_obj = get_list_cat_by_name(category_name)

    if category_obj:

        cat_id = category_obj.cat_id

        item = (
            db.session.query(Item)
            .filter(Item.name == name, Item.cat_id == cat_id)
            .first()
        )

    else:

        item = None

    return item


def get_list_details_by_list_id(list_id):
    """Return a list of items + gear

    takes in a list id
    returns a list of item objects"""

    list_obj = get_list_by_id(list_id)

    list_name = list_obj.name

    list_items = db.session.query(List_item).filter(List_item.list_id == list_id).all()

    categorized_items = order_item_by_category(list_items)

    list_content = {}

    categories = categorized_items.keys()

    for category in categories:
        category_data = {}
        for list_item in categorized_items[category]:

            item = list_item.item
            gear = list_item.gear

            if gear:
                category_data[list_item.list_item_id] = {
                    "item": item.json_format(),
                    "gear": gear.json_format(),
                }

            else:
                category_data[list_item.list_item_id] = {
                    "item": item.json_format(),
                    "gear": None,
                }

            list_content[category] = category_data

    list_data = {
        "list_id": list_id,
        "list_name": list_name,
        "list_content": list_content,
    }

    return list_data


def order_item_by_category(list_items):
    """Takes in a list of list_items and orders them by category

    returns an ordered list"""

    categorized_items = {}

    for list_item in list_items:

        item = list_item.item

        category = item.item_category.name

        if categorized_items.get(category):
            categorized_items[category].append(list_item)
        else:
            categorized_items[category] = [list_item]

    return categorized_items


def get_gear_by_user(user):
    """Return unique list of gear by user"""

    user_id = user.user_id

    gear_items = (
        db.session.query(Gear)
        .join(List_item)
        .join(List)
        .filter(List.user_id == user_id)
        .all()
    )

    user_gear = set(gear_items)

    return user_gear


def get_gear_by_id(gear_id):
    """Get gear by id#

    take in num and return gear obj"""

    gear = db.session.query(Gear).filter(Gear.gear_id == gear_id).one()

    return gear


def get_list_by_id(list_id):
    """Get list by list id

    takes in integer, returns list object"""

    list_obj = db.session.query(List).filter(List.list_id == list_id).one()

    return list_obj


def delete_list(list_obj):
    """Delete list object

    takes in object to be deleted"""

    list_id = list_obj.list_id

    list_items = db.session.query(List_item).filter(List_item.list_id == list_id).all()

    for list_item in list_items:
        db.session.delete(list_item)
    db.session.commit()

    db.session.delete(list_obj)
    db.session.commit()


def get_list_item(list_item_id):
    """Find a specific list item relationship

    Takes in the list_item id and returns an object"""

    list_item = (
        db.session.query(List_item).filter(List_item.list_item_id == list_item_id).one()
    )

    return list_item


def delete_list_item(list_item):
    """Delete list item relationship

    takes in the list_item object"""

    db.session.delete(list_item)
    db.session.commit()


## test categorizing by query
## decided to revist after project season
## needed to focus on finalizing front end
## code test below

# def categorize_by_query(list_id):
#     """Select list_items in Category order by list ID"""

#     # list_items = db.session.query(List_item).filter(List_item.list_id==list_id).all()

#     ordered_list_items = (db.session.query(List_item, Item_category.name).select_from(List_item)
#                         .join(Item).join(Item_category).join(Gear)
#                         .filter(List_item.list_id==list_id).order_by(Item_category.name).all())

#     categorized_items = {}

#     for item in ordered_list_items:
#         if categorized_items.get(item[1]):
#             categorized_items[item[1]].append(item[0])
#             print(categorized_items)
#         else:
#             categorized_items[item[1]] = [item[0]]
#             print("elseeee")

#     return categorized_items


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
