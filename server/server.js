const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const async = require('async');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
mongoose.connection.on('connected', () =>{
    console.log("mongoose is ready");
})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})


// ============== MODEL ===============
const {User} = require("./models/user");
const {Genus} = require('./models/genus');
const { Type } = require('./models/type');
const { Product } = require("./models/product");
const { Payment } = require("./models/payment");
const {Site} = require('./models/site');

//=============== MIDDLEWARE ===========
const {auth} = require('./middleware/auth');
const { admin } = require('./middleware/admin');


// ============== API ===============

//TEST
app.get('/api/users/test', (req, res) => {
    res.status(200).json({ "test": "succcess" });
});

//AUTH
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        cart: req.user.cart,
        history: req.user.history,
    });
});


// =========================
//          WOOD
// =========================
app.post("/api/product/type",auth,admin,(req,res)=>{
    const type = new Type(req.body);

    type.save((err,doc)=>{
        if(err) return res.json({success: false ,err});
        res.status(200).json({
            success: true,
            type: doc
        })
    })
})

app.get("/api/product/types", (req, res) => {
    Type.find({},(err,types)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(types);
    })
});



// =========================
//          BRAND
// =========================


//ADD A NEW BRAND FOR ADMIN
app.post("/api/product/genus",auth,admin,(req,res)=>{
    console.log(req.body)
    const genus = new Genus(req.body);

    genus.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
            genus: doc
        })
    })
});

//GET ALL THE BRAND WITH NO AUTHENTICATION
app.get("/api/product/genuses",(req, res) => {
    Genus.find({},(err,genuses)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(genuses);
    })
});


// =========================
//          PRODUCT
// =========================

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order: 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    //giá trị truyền vào hàm find
    //giá  trị này có dạng 
    //  {
    //      brands: {},
    //      woods: {},
    //      price: {
    //          $gte: ,
    //          $lte: }
    //}

    let findArgs = {}

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
        console.log(findArgs);
    }

    Product
    .find(findArgs)
    .populate('genus')
    .populate('type')
    .sort([[sortBy,order]])
    .skip(skip) 
    .limit(limit)
    .exec((err,articles)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({
            size: articles.length,
            articles
        })
    })
});

//ADD NEW PRODUCT
app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);
    product.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})
// GET PRODUCT BY ID

app.get('/api/product/articles_by_id',(req,res)=>{
    
    let type = req.query.type;
    let items = req.query.id;
    console.log(items);

    if(type === 'array'){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item =>{
            return mongoose.Types.ObjectId(item);
        })
    }

    Product.find({'_id':{$in:items}})
    .populate('genus')
    .populate('type')
    .exec((err,docs)=>{
        return res.status(200).send(docs);
    })

})


// BY ARRIVAL
//articles?sortBy=createdAt&order=desc&limit=4

//BY SELL
//articles?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    
    Product.find()
        .populate('genus')
        .populate('type')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err, articles) => {
            if(err) return res.status(400).send(err)
            res.send(articles)
        })
})


// =========================
//          USER
// =========================

//REGISTER 
app.post('/api/users/register', jsonParser,(req,res)=>{
    const user = new User(req.body);
    user.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
        });
    });
});

//LOGIN
app.post('/api/users/login', jsonParser,(req,res)=>{
    // find the email
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess: false,message: 'Auth failes,email not found'});
        //check password
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false,message: 'wrongPassword'})
            user.gennerateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                //gennerate Token
                res.cookie('u_auth',user.token).status(200).json({
                    loginSuccess: true
                });
            });
        });
    });
})

//LOGOUT

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.user._id},//tìm theo id
        {token:''},//update token của user tìm đc bằng rổng
        //callback function 
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})


app.post('/api/users/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;

        doc.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })

        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": mongoose.Types.ObjectId(req.query.productId)
                }
                ,{ $inc: {"cart.$.quantity": 1}},
                {new: true}
                ,() => {
                    console.log(doc.cart)
                    if(err) return res.json({success: false,err})
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {
                    _id: req.user._id
                },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now(),
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})


app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url,
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: `auto`
    })
})

app.get('/api/users/removeFromCart',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull":
            {"cart": {"id": mongoose.Types.ObjectId(req.query._id)}}
        },
        {new: true},
        (err,doc) => {
            let cart =  doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product
            .find({"_id":{$in: array}})
            .populate('genus')
            .populate('type')
            .exec((err,cartDetail)=>{
                return  res.status(200).json({
                    cartDetail,
                    cart
                })      
            })
        }
    )
})

app.post('/api/users/successBuy',auth,(req,res) => {

    let history = [];
    let transactionData = {};


    //user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymenId: req.body.paymentData.paymentID

        })
    })

    //PAYMENTS DASH

    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        {_id: req.user._id},
        {$push: {history: history}, $set:{cart: []}},
        {new: true},
        (err,user)=>{
            if(err) return res.json({success: false,err});
                const payment = new Payment(transactionData);
                payment.save((err,doc)=>{
                    if (err) return res.json({ success: false, err });
                    let products = [];
                    doc.product.forEach(item=>{
                        products.push({id: item.id,quantity: item.quantity})
                    })
                    async.eachSeries(products,(item,callback)=>{
                        Product.update(
                            {_id:item.id},
                            {$inc:{
                                "sold": item.quantity
                            }},
                            {new:false},
                            callback
                        )
                    },(err)=>{
                        if(err) return res.json({success:false,err})
                        res.status(200).json({
                            success: true,
                            cart: user.cart,
                            cartDetail: []
                        })
                    })
                })
        }

    )

})

app.post('/api/users/update_profile',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$set": req.body
        },
        {new: true},
        (err,doc)=>{
            if(err) return res.json({success: true,err})
            return res.status(200).send({
                success: true
            })
        }
    )

})


//SITE////////////////////////

app.get('/api/site/site_data',auth,(req,res)=>{
    Site.find({},(err,site)=>{
        console.log(site)
        if(err) return res.status(400).send(err);
        res.status(200).send(site)
    });
});


app.post('/api/site/site_data', auth, admin, (req, res) => {
   Site.findOneAndUpdate({},
       {"$set": {siteInfo: req.body}},
       {new: true},
       (err,doc) => {
           if(err) return res.json({success: false, err})
           console.log(doc) 
           return res.status(200).send({
                success: true,
                siteInfo:  doc.siteInfo
            })
       }
    )
});

app.post('/api/site', (req, res) => {
    const site = new Site({
        featured: [],
        siteInfo: [{
            address: "",
            hour: "",
            phone: "",
            email: ""
        }]
    })
    site.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            site: doc
        })
    })
    // Site.find({}, (err, site) => {
    //     console.log(site)
    //     if (err) return res.status(400).send(err);
    //     res.status(200).send(site)
    // });
});

app.post('/api/users/update_password', auth, (req, res) => {
    User.findOne({
        _id: req.user._id
    }, (err, user) => {
        if (err) return res.json({ success: false, err })
        user.password = req.body.password;
        user.save((err, doc) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({
                success: true
            })
        })
    })
})

app.post('/api/users/search', auth, (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    const matchRegex = new RegExp(req.body.keyword);
    console.log(matchRegex)
    Product.find({ name: { $regex: matchRegex } })
        .skip(skip)
        .limit(limit)
        .select("_id name images genus")
        .exec((err, products) => {
            if (err) res.status(400).json(err);
            res.status(200).json({products});
        })
})

app.use(function (req, res, next) {
    res.status(404).send('Unable to find the requested resource!');
});

const port =  process.env.PORT || 3002;
app.listen(port,()=>{{
    console.log(`Server is running at ${port}`);
}})


//////////////////////////////////////////

