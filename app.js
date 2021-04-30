const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
// const morgan = require('morgan');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'));

// Data for EJS files
let userName = 'CodeSquader';
let date = new Date();
let year = date.getFullYear();
// Array containing 3 objects, each object representing information about a specific product. This is a representation of information that would actually be stored in a database. Since we're not to databases yet, we'll use this array instead. 
let inventory = [
    {
        _id: '001',
        name: 'skateboard',
        numberOfWheels: 4,
        price: 50.00,
    },
    {
        _id: '002',
        name: 'bike',
        numberOfWheels: 2,
        price: 100.00,
    },
    {
        _id: '003',
        name: 'roller skates',
        numberOfWheels: 8,
        price: 35.00,
    }
]

// Routes
app.get('/', (request, response) => {
    response.render('pages/index', {
        name: userName,
        copyrightYear: year,
    });
});

app.get('/inventory', (request, response) => {
    response.render('pages/inventory', {
        name: userName,
        copyrightYear: year,
        inventoryArray: inventory,
    });
});

app.get('/about', (request, response) => {
    response.render('pages/about', {
        name: userName,
        copyrightYear: year,
    });
});

app.get('/:name', (request, response) => {
    let parameters = request.params;
    console.log (request.params);
    let name = parameters.name;
    response.send(`It worked ${name}. Imagine how this route could lead to the profile of ${name}, which is what was typed into the URL in place of :name. Routes with parameters are awesome.`)
})

app.get('/product/:_id', (request, response) => {
    let params = request.params;
    console.log(params);
    if (params._id === '001') {
        response.render('pages/product', {
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[0],
        });
    } else if (params._id === '002') {
        response.render('pages/product', {
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[1],
        });
    } else if (params._id === '003') {
        response.render('pages/product', {
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[2],
        });
    } else {
        response.send(`This product doesn't exist. Try searching again. `);        
    };
});



// Server
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});




