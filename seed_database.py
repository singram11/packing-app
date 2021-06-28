""" Script to Seed db with temporary test data """

import os
from random import choice, randint

import model
import server
import crud

os.system('dropdb packme')
os.system('createdb packme')


default_list_categories = ["camping", "backpacking", "travel", "climbing"]

default_item_categories = ["clothes", "shelter", "kitchen",]

sample_gear = { "jetboil": {
                    "name": "jetboil",
                    "item": "stove"
                },
                "half dome 2":{
                    "name": "half dome 2",
                    "item": "tent"
                },
                "petzel 2 grigri": {
                    "name": "petzel 2 grigri",
                    "item": "belay device"
                },
                "nanopuff": {
                    "name":"nanopuff",
                    "item": "jacket"
                }}

model.connect_to_db(server.app)
model.db.create_all()

#create list default categories 

list_cat = []

for category in default_list_categories:

    new_cat = crud.create_list_category(category)
    list_cat.append(new_cat)


#create item default categories
item_cat = []

for category in default_item_categories:

    new_cat = crud.create_item_category(category)
    item_cat.append(new_cat)
    

#create gear 
gear_list = []
for item in sample_gear:

    weight = None
    description = None
    img = None
    new_gear =  crud.create_gear(sample_gear[item]["name"], weight, description, img)
    gear_list.append(new_gear)


#create list items 
list_items = []

for item in sample_gear:
    print(item_cat)
    name = sample_gear[item]["item"]
    category_obj = choice(item_cat)
    category = category_obj.name
    new_item = crud.create_list_item(name, category)
    list_items.append(new_item)

#create users
list_users =[]
list_user_lists =[]
# i = 0

for n in range(10):
    email = f'user{n}@test.com'  # Voila! A unique email!
    password = 'test'
    fname = f'firstname{n}'
    lname = f'lastname{n}'

    user = crud.create_user(fname, lname, email, password)
    list_users.append(user)
    # i = i + 1

    for i in range(2):
        category = choice(list_cat)
        list_no = n
        name = f"My list: {list_no}"
        user_list = crud.create_list(user, name, category)
        list_user_lists.append(user_list)

# add items to list
list_item_rels = []

for list_obj in list_user_lists:
    for i in range(2):
        rand_item = choice(list_items)
        list_rel = crud.create_list_item_relationship(list_obj,rand_item)
         
#associate gear with items 
gear_item_rels = []
for item  in list_items:
    gear = choice(gear_list)
    gear_item_rel = crud.associate_gear_to_item(gear,item)
    gear_item_rels.append(gear_item_rel)


crud.associate_gear_to_item(gear_list[0],list_items[0])
