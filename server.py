""" Server for the packing app"""

from flask import Flask, render_template, flash, session, redirect, jsonify, request

from model import connect_to_db

import crud
import cloudinary.uploader
import os


app = Flask(__name__)
app.secret_key = "dev"
#do the thing - markov bot lab

CLOUDINARY_KEY = os.environ['CLOUDINARY_KEY']
CLOUDINARY_KEY_SECRET = os.environ['CLOUDINARY_SECRET']


@app.route('/')
@app.route('/lists')
@app.route('/gear')
def render_app():
    """Shows app"""

    return render_template('app.html')

@app.route('/<path>/<code>')
def render_app_from_item(path, code):
    """Shows app"""

    return render_template('app.html')

@app.route('/login', methods=['POST'])
def login_user():
    """log the user in or return an error"""

    email = request.json.get('email')
    password = request.json.get('password')

    message = ''
    success = False

    user = crud.get_user_by_email(email)
    
    if user:
        if user.password == password:
            session['email'] = email
            message = 'Logged in'
            success = True
        else: 
            message = 'Your username or password is incorrect'
    else: 
        message = 'Your username or password is incorrect'

    response_data = {}
    response_data['message'] = message
    response_data['success'] = success
    
    return response_data

@app.route('/api/user/me')
def ger_user_details():
    """return the user details"""

    email = session['email']
    user = crud.get_user_object(email)

    return user.json_format()


@app.route('/new-account', methods=['POST'])
def create_account():

    email = request.json.get('email')
    password = request.json.get('password')
    fname = request.json.get('fname')
    lname = request.json.get('lname') 

    response_message, user = crud.create_new_account(fname, lname, email, password)

    print(response_message)
    print(user)

    if user:
        session['email'] = user.email

    return jsonify(response_message)

@app.route('/api/lists')
def show_user_lists():
    
    email = session['email']
    user = crud.get_user_object(email)
    lists = crud.get_lists_by_user(user)
    
    user_lists = {}
    
    for user_list in lists:
        user_lists[user_list.list_id] = user_list.json_format()
          
    return jsonify(user_lists)

@app.route('/api/lists/<list_id>')
def show_list_items(list_id):
    """Return the list item data for a list"""
    
    list_data = crud.get_list_details_by_list_id(list_id)


    return jsonify(list_data)
        


@app.route('/api/gear')
def show_user_gear_list():

    email = session['email']
    user = crud.get_user_object(email)
    user_gear = crud.get_gear_by_user(user)
    

    gear_data = {}

    for item in user_gear:

        gear_data[item.gear_id] = {'name': item.name}
                                  
    return jsonify(gear_data)

@app.route('/api/gear/<gear_id>')
def show_user_gear_item(gear_id):

    gear = crud.get_gear_by_id(gear_id)

    gear_data = {'name': gear.name,
                'weight': gear.weight,
                'description':gear.description,
                'img': gear.img}
    
    return jsonify(gear_data)


@app.route('/api/list-item', methods=['POST'])
def create_new_list_item():
    """Add a new list item to the DB"""
    
    #organize by cat
    
    list_id = request.json.get('id')
    name = request.json.get('name')
    category = request.json.get('category')

    list_item = crud.add_item_to_list(list_id, name, category)

    
    return jsonify(list_item)


@app.route('/api/lists', methods=['POST'])
def create_new_list():
    """Add a new list to the DB"""

    email = session['email']

    user = crud.get_user_object(email)
    name = request.json.get('name')
    category = request.json.get('category')

    category_obj = crud.get_list_cat_by_name(category)

    if not category_obj:
        category_obj = crud.create_list_category(category)

    new_list = crud.create_list(user, name, category_obj)

    new_list_data ={}
    new_list_data[new_list.list_id] = {'name':new_list.name}

    return jsonify(new_list_data)

@app.route('/api/gear', methods=['POST'])
def create_new_gear():
    """Create a new piece of gear and associate it with 
    a list_item"""

    gearName = request.json.get('name')
    weight = request.json.get('weight')
    description = request.json.get('description')
    img_file = request.json.get('img')
    list_item_id = request.json.get('listItemId')
    
    print(f'image_file:{img_file}')

    #cloudinary upload 
    if img_file:
        result = cloudinary.uploader.upload(img_file,
                                            api_key=CLOUDINARY_KEY,
                                            api_secret=CLOUDINARY_KEY_SECRET,
                                            cloud_name='dpmxuctlw')
        #make sure this is what I want
        img_url = result['secure_url']
    else: 
        img_url = None
    print(img_url)
    new_gear = crud.create_gear(gearName, weight, description, img_url)

    list_item = crud.get_list_item(list_item_id)

    details = crud.add_gear_to_item(new_gear, list_item)

    gear_data = {}
    gear_data[new_gear.gear_id] = { 'name': new_gear.name,
                                    'weight': new_gear.weight,
                                    'description': new_gear.description,
                                    'img': new_gear.img }

    return jsonify(gear_data)

@app.route('/api/list-item/add-gear', methods=['POST'])
def add_gear_to_item():
    """Associate existing gear with a list_item"""

    gear_id = request.json.get('gear')
    list_item_id = request.json.get('listItemId')

    #might be able to use the ID directly 
    gear_obj = crud.get_gear_by_id(gear_id)

    list_item = crud.get_list_item(list_item_id)

    association = crud.add_gear_to_item(gear_obj, list_item)

    message = {}

    if association:
        message['message'] = 'Gear Added'
    else:
        message['message'] = 'This gear was not added'

    return message

@app.route('/api/lists/<list_id>', methods=['DELETE'])
def remove_list(list_id):
    """Remove list from DB"""
    
    
    list_obj = crud.get_list_by_id(list_id)
    
    crud.delete_list(list_obj)

    return jsonify({'message': 'item deleted'})
    #remember for list item that other people might be using item
    #will need to remove the relationship

    #list-item/item-id with delete methods 
@app.route('/api/list-item/<list_item_id>', methods=['DELETE'])
def remove_list_items(list_item_id):
    """Remove list item from user lists

    delete list item in DB"""

    # list_item_id = request.json.get('id')

    list_item = crud.get_list_item(list_item_id)
    
    crud.delete_list_item(list_item)
    #do NOT delete item (may appear in other lists)
    return jsonify({'message':'item deleted'})

# @app.route('/api/upload-image', methods=['POST'])
# def upload_gear_image():
#     """Upload gear image to cloudinary"""

#     img_file = request.json.get('file')

#     result = cloudinary.uploader.upload(img_file,
#                                         api_key=CLOUDINARY_KEY,
#                                         api_secret=CLOUDINARY_KEY_SECRET,
#                                         cloud_name='dpmxuctlw')

#     img_url = result['secure_url']

#     print(f'result: {result}')
#     print(f'image_url: {img_url}')

#     return {'image': img_url}


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='127.0.0.1', debug=True)