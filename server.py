""" Server for the packing app"""

from flask import Flask, render_template, flash, session, redirect, jsonify, request

from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"
#do the thing - markov bot lab

@app.route('/')
def render_homepage():
    """ Shows homepage """

    return render_template('index.html')

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
 

@app.route('/gear')
def render_gear_page():
    """ Shows my gear template """

    return render_template('gear.html')

@app.route('/lists')
def render_lists_page():
    """Show list page template"""

    return render_template('lists.html')

@app.route('/userlists/items/<list_id>')
def render_list_details_page():
    """Show list details page"""

    return render_template('lists.html')

@app.route('/api/userlists')
def show_user_lists():
    # user = get from session 
    email = session['email']
    user = crud.get_user_object(email)
    lists = crud.get_lists_by_user(user)
    
    user_lists = {}
    
    for user_list in lists:
        print(f'user lists: {user_list}')
        user_lists[user_list.list_id] = {'name': user_list.name,
                                        'category': user_list.category.name
        }
          
    return jsonify(user_lists)

@app.route('/api/userlists/items/<list_id>')
def show_list_items(list_id):
    
    
    list_items = crud.get_list_items_by_id(list_id)

    list_item_data = {}
    #make the gear key 
    for item in list_items: 

        if item.gear:
            print("Made it to the gear section")                            #not all items will have gear need to deal with this 
            list_item_data[item.item_id] = {'name': item.name,
                                           'category': item.item_category.name,
                                           'gear': item.gear[0].name}
        else: 
            print("made it to the non gear")
            list_item_data[item.item_id]= {'name': item.name,
                                           'category': item.item_category.name}

    return jsonify(list_item_data)
        


@app.route('/api/usergear')
def show_user_gear_list():

    email = session['email']
    user = crud.get_user_object(email)
    user_gear = crud.get_gear_by_user(user)
    
    gear_data = {}

    for item in user_gear:

        gear_data[item.gear_id] = {'name': item.name}
                                    # 'weight': item.weight,
                                    # 'description':item.description,
                                    # 'img': item.img}
    return jsonify(gear_data)

@app.route('/api/usergear/details/<gear_id>')
def show_user_gear_item(gear_id):

    gear = crud.get_gear_by_id(gear_id)

    gear_data = {'name': gear.name,
                'weight': gear.weight,
                'description':gear.description,
                'img': gear.img}

    return jsonify(gear_data)


@app.route('/new-list-item', methods=['POST'])
def create_new_list_item():
    """Add a new list item to the DB"""
    
    #Need to handle categories that dont exist 
    #organize by cat
    
    list_id = request.json.get('id')
    name = request.json.get('name')
    category = request.json.get('category')

    category_obj = crud.get_list_item_cat_by_name(category)

    #maybe we want set categories???? #or make it more clear when 
    # you are making a new one???
    #move to crud
    if not category_obj:
        category_obj = crud.create_item_category(category)
        category = category_obj.name

    list_obj = crud.get_list_by_id(list_id)
    list_item = crud.create_list_item(name, category)
    
    crud.create_list_item_relationship(list_obj, list_item)
    #make these to a helper function - crud or other file for this
    #or on the classes
    list_item_data = {}
    list_item_data[list_item.item_id]= {'name': list_item.name,
                                           'category': list_item.item_category.name}

    return jsonify(list_item_data)


@app.route('/new-list', methods=['POST'])
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

@app.route('/new-gear', methods=['POST'])
def create_new_gear():

    gearName = request.json.get('name')
    weight = request.json.get('weight')
    description = request.json.get('description')
    img = request.json.get('img')

    new_gear = crud.create_gear(gearName, weight, description, img)

    gear_data = {}
    gear_data[new_gear.gear_id] = { 'name': new_gear.name,
                                    'weight': new_gear.weight,
                                    'description': new_gear.description,
                                    'img': new_gear.img }

    return jsonify(gear_data)

@app.route('/remove-list', methods=['POST'])
def remove_list():
    """Remove list from DB"""

    list_id = request.json.get('id')

    list_obj = crud.get_list_by_id(list_id)
    crud.delete_list(list_obj)

    return jsonify({'message': 'item deleted'})
    #remember for list item that other people might be using item
    #will need to remove the relationship

#list-item/item-id with delete methods 
@app.route('/remove-list-item', methods=['POST'])
def remove_list_items():
    """Remove list item from user lists

    delete list item rel in DB"""

    list_item_id = request.json.get('id')

    list_item_rel = crud.get_list_item_rel(list_item_id)
    
    crud.delete_list_item_rel(list_item_rel)
    #do NOT delete list item (may appear in other lists)
    return jsonify({'message':'item deleted'})


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='127.0.0.1', debug=True)