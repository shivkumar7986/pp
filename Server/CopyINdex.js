
 
// var  errorMiddleware = require('./ErrorMiddleware')
// var express = require('express');
// var mongoose = require('mongoose')
// var bodyParser= require('body-parser')
// var cors = require('cors')
// var multer= require('multer')
// const serverConnection = require('./Connection')
// const pageRoute= require('./Routes/Pages')
// const app = express();





// const port = 5000;
// app.use(cors());
// app.use(bodyParser.json());
// app.use(errorMiddleware)



// const serverConnection1 =serverConnection





const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  lastlogin: Date,
});

const loginModel = mongoose.model("loginData", loginSchema);
app.post("/api/login", async (req, res) => {
  try {
    const { uname, pass } = req.body;
    // Find user login info using Mongoose
    const userData = await loginModel.findOne({
      username: uname,
      password: pass,
    });

    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        res.status(400).json({ error: "Invalid password" });
      } else {
        // Update lastLogin field
        userData.lastlogin = new Date();
        await userData.save();
        console.log(userData);
        res.json({ data: userData });
      }
    } else {
      // Username not found
      res.status(404).json({ error: "Username not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const formSchema = new mongoose.Schema({
//   // Define your form fields here
//   name: { type: String },
//   slug: { type: String },
//   metatitle: { type: String },
//   metades: { type: String },
//   published: { type: Number },
//   frontpage: { type: Number },
//   editorContent: { type: String },
//   selected: { type: Array },
//   url: String,
//   htmlContent: String,
// });

// const FormModel = mongoose.model("FormDataa", formSchema);

app.use("/api",pageRoute);

// data dynamically
app.get("/api/get-form-data", async (req, res) => {
  try {
    const formData = await FormModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//frontend data show of pages
app.get("/api/get-forntend-data/:id", async (req, res,next) => {
  try {
    const formData = await FormModel.findOne({
      _id: req.params.id,
      published: 1,
      frontpage: 1,
    });
    res.status(200).json(formData);
    console.log(formData);
  } catch (err) {

    const status = 500;
    const message= err.errors[0].message;

    const error = {
      status,message,
    }
        // console.error(error);
    // res.status(500).send("Internal Server Error");
    next(error)
  }
});

//for again fetching data
app.get("/api/get-form-data/:id", async (req, res) => {
  try {
    const formData = await FormModel.findOne({ _id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const deletedFormData = await FormModel.findByIdAndDelete(req.params.id);
    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/edit/:id", async (req, res) => {
  try {
    const updatedFormData = await FormModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          metatitle: req.body.metatitle,
          metades: req.body.metades,
          published: req.body.published,
          frontpage: req.body.frontpage,
          editorContent: req.body.editorContent,
          selected: req.body.selected,
          url: req.body.url,
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//frontpage
app.get("/api/update-checkbox/:id/:frontpage", async (req, res) => {
  try {
    const updatedFormData = await FormModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          frontpage: req.params.frontpage,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//published
app.get("/api/update-checkbox2/:id/:published", async (req, res) => {
  try {
    const updatedFormData = await FormModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          published: req.params.published,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res.status(200).json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///for fromio module
app.post("/api/formio-submission", async (req, res) => {
  try {
    // Log the form data to the console
    console.log("Form submission received:", req.body);

    // Process the form data as needed
    // Example: Send the data to another API
    const response = await axios.post("https://example.com/api/data", req.body);

    // Respond to the client
    res.json({ success: true, responseData: response.data });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
const formSchema2 = new mongoose.Schema({
  userId: String,
  formbuilder: String,
  data: Array,
});

const FormModel2 = mongoose.model("FormData2", formSchema2);
// app.post("/api/form-module-submission", async (req, res) => {
//   console.log(req.body);
//   // try {
//   //   const formData2 = new FormModel2({
//   //     userId:req.body.userId,
//   //     formbuilder: req.body.formbuilder,
//   //     data: req.body.data,
//   //   });
//   //   await formData2.save();
//   //   res.status(201).json(formData2);
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).send("internal server error");
//   // }
// });
app.get("/api/get-formbuilder-data", async (req, res) => {
  try {
    const formData2 = await FormModel2.find();
    res.status(200).json(formData2);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for menu page
const menuSchema = new mongoose.Schema({
  name: { type: String },
  menutype: { type: String },
  menulink: { type: String },
  publish: { type: String },
});

const MenuModel = mongoose.model("MenuData", menuSchema);
app.post("/api/submit-menu", async (req, res) => {
  try {
    const menuData = new MenuModel({
      name: req.body.name,
      menutype: req.body.menutype,
      menulink: req.body.menulink,
      publish: req.body.publish,
    });
    await menuData.save();
    console.log(menuData);
    res.status(201).json(menuData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for getting the menu data in to the frontpage navbar
// app.get("/api/get/menu/front-page/header/data", async (req, res) => {
//   try {
//     const aggregatedData = await MenuModel.find({
//       menutype: "Header Menu(active)",
//       publish: "yes",
//     });

//     // console.log("Aggregated Data Length:", aggregatedData.length);

//     let arr = [];
//     for (const key in aggregatedData) {
//       const element = aggregatedData[key];
//       //menu id
//       let pid = element._id;
//       let submenuData = await SubMenuModel.find({ p_id: pid, publish: "yes" });
//       // console.log("Submenu Data Length:", submenuData.length);
//       let arr2 = [];

//       let withoutSubmenu = {};
//       if (submenuData.length > 0) {
//         for (const key2 in submenuData) {

//           const element2 = submenuData[key2];
//           let Page = await FormModel.findOne({ _id: element2.menulink });
//           console.log("Page Data:", Page);
//           let json2 = {
//             submenuName: element2.submenuname,
//             submenupublish: element2.publish,
//             submenulink: element2.menulink,
//             submenuID: element2._id,
//             pageName: Page.name,
//             pageID: Page._id,
//             slug: Page.slug,
//           };
//           arr2.push(json2);
//         }
//       } else {
//         let Page = await FormModel.findOne({ _id: element.menulink });
//         withoutSubmenu = {
//           pageName: Page.name,
//           pageID: Page._id,
//           slug: Page.slug,
//         };
//       }
//       let json = {
//         menuName: element.name,
//         menuType: element.menutype,
//         menulink: element.menulink,
//         menuID: element._id,
//         submenu: arr2,
//         pageData: withoutSubmenu,
//       };

//       arr.push(json);
//     }

//     res.status(200).json(arr);
//     // Add more console.log statements as needed
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/api/get/menu/front-page/header/data", async (req, res) => {
  try {
    const aggregatedData = await MenuModel.find({
      menutype: "Header Menu(active)",
      publish: "yes",
    });
    console.log("Aggregated Data Length:", aggregatedData.length);

    let arr = [];

    for (const key in aggregatedData) {
      const element = aggregatedData[key];
      let pid = element._id;
      let submenuData = await SubMenuModel.find({ p_id: pid, publish: "yes" });
      // console.log("Submenu Data Length:", submenuData.length);

      let arr2 = [];
      let withoutSubmenu = {};

      if (submenuData.length > 0) {
        for (const key2 in submenuData) {
          const element2 = submenuData[key2];
          let Page = await FormModel.findOne({ _id: element2.menulink });
          console.log("Page Data:", Page);

          let json2 = {
            submenuName: element2.submenuname,
            submenupublish: element2.publish,
            submenulink: element2.menulink,
            submenuID: element2._id,
            pageName: Page ? Page.name : null,
            pageID: Page ? Page._id : null,
            slug: Page ? Page.slug : null,
          };
          arr2.push(json2);
        }
      } else {
        let Page = await FormModel.findOne({ _id: element.menulink });
        // console.log("Page Data Without Submenu:", Page);

        withoutSubmenu = {
          pageName: Page ? Page.name : null,
          pageID: Page ? Page._id : null,
          slug: Page ? Page.slug : null,
        };
      }

      let json = {
        menuName: element.name,
        menuType: element.menutype,
        menulink: element.menulink,
        menuID: element._id,
        submenu: arr2,
        pageData: withoutSubmenu,
      };

      arr.push(json);
    }

    // console.log("Final Data:", arr);
    res.status(200).json(arr);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//for menu link -getting page data in the menu page
app.get("/api/get-menulink-data", async (req, res) => {
  try {
    const formData = await FormModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for fetching menu data in table
app.get("/api/get-menuForm-data", async (req, res) => {
  try {
    const formData = await MenuModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update check box
app.get("/api/update-menu-checkbox/:id/:publish", async (req, res) => {
  try {
    const updatedFormData = await MenuModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.params.publish,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete
app.delete("/api/delete-menu/:id", async (req, res) => {
  try {
    const deletedFormData = await MenuModel.findByIdAndDelete(req.params.id);
    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get data in form basis of id for edit
app.get("/api/get-menu-data/:id", async (req, res) => {
  try {
    const menuData = await MenuModel.findOne({ _id: req.params.id });
    res.status(200).json(menuData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update data
app.put("/api/edit-menu/:id", async (req, res) => {
  try {
    const updatedFormData = await MenuModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          menulink: req.body.menulink,
          menutype: req.body.menutype,
          publish: req.body.publish,
        },
      },
      { new: true }
    );

    // if (!updatedFormData) {
    //   return res.status(404).json({ error: "Form data not found" });
    // }
    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for getting the menu data in to the frontpage navbar
app.get("/api/get/menu/front-page/footer/data", async (req, res) => {
  try {
    const formData = await MenuModel.find({ menutype: " Footer menu(active)" });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for getting the menu data in to the frontpage navbar
app.get("/api/get/menu/front-page/left-side/data", async (req, res) => {
  try {
    const formData = await MenuModel.find({
      menutype: "Left side bar (active)",
    });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for submenu schema
const submenuSchema = new mongoose.Schema({
  // id:{type:String},
  p_id: { type: String, auto: true },
  submenuname: { type: String },
  parentMenuName: { type: String },
  menulink: { type: String },
  publish: { type: String },
});

const SubMenuModel = mongoose.model("SubMenuData", submenuSchema);

app.post("/api/submit-submenu", async (req, res) => {
  try {
    console.log(req.body);
    const submenuData = new SubMenuModel({
      p_id: req.body.p_id,
      submenuname: req.body.submenuname,
      parentMenuName: req.body.parentMenuName,
      menulink: req.body.menulink,
      publish: req.body.publish,
    });
    await submenuData.save();
    console.log(submenuData);
    res.status(201).json(submenuData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get data into the table on basis fo id
app.get("/api/get-submenuForm-data/:id", async (req, res) => {
  try {
    const formData = await SubMenuModel.find({ p_id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for Parent menu name or data in the submenu page
app.get("/api/get-parent-submenu-data/:id", async (req, res) => {
  try {
    const menuData = await MenuModel.findOne({ _id: req.params.id });
    res.status(200).json(menuData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//for menu link-getting  page  data in  the menu  page
app.get("/api/get-main-menu-data", async (req, res) => {
  try {
    const formData = await FormModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update check box
app.get("/api/update-submenu-checkbox/:id/:publish", async (req, res) => {
  try {
    const updatedFormData = await SubMenuModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.params.publish,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete sub menu
app.delete("/api/delete-sub-menu/:id", async (req, res) => {
  try {
    const submenuData = await SubMenuModel.findByIdAndDelete(req.params.id);
    if (!submenuData) {
      return res.status(404).json({ error: "submenu data is not find " });
    }
    res.status(200).json({ message: "Submenu data delleted successfully" });
  } catch (error) {
    console.error("error in deleting the submenu data ", error);
    res.status(500).send("Internal server error ");
  }
});

//get data basis of id for edit
app.get("/api/get-edit-sub-menu-data/:id", async (req, res) => {
  try {
    console.log(req.params);
    const submenuData = await SubMenuModel.findOne({
      _id: req.params.id,
    });
    console.log("Submenu Data:", submenuData); // Add this line
    res.status(200).json(submenuData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/api/get-edit-sub-menu-data/:id", async (req, res) => {
//   try {
//     console.log(req.params);
//     const submenuData = await SubMenuModel.findOne({
//       _id: req.params.id,
//     });
//     res.status(200).json(submenuData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//update data

app.put("/api/edit-sub-menu/:id", async (req, res) => {
  try {
    const updatedFormData = await SubMenuModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          p_id: req.body.p_id,
          submenuname: req.body.submenuname,
          menulink: req.body.menulink,
          parentMenuName: req.body.parentMenuName,
          publish: req.body.publish,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// //for menugroup
const GroupMenu = new mongoose.Schema({
  groupName: String,
  publish: String,
});

const MenuGroupModel = mongoose.model("MenuGroupData", GroupMenu);

app.post("/api/submit-menu-group", async (req, res) => {
  try {
    const groupData = new MenuGroupModel({
      groupName: req.body.groupName,
      publish: req.body.publish,
    });
    await groupData.save();
    res.status(201).json(groupData);
    console.log(groupData);
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

//to get data in table
app.get("/api/get-menu-group", async (req, res) => {
  try {
    const groupData = await MenuGroupModel.find();
    res.status(201).json(groupData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//delete the data fron the table
app.delete("/api/delete-group-data/:id", async (req, res) => {
  try {
    const groupData = await MenuGroupModel.findByIdAndDelete(req.params.id);
    if (!groupData) {
      res.status(404).json({ error: "Menu data is not find" });
    }
    res.status(200).json({ message: "Data deleted successfully " });
  } catch (error) {
    console.error("Error in deleting the data", error);
    res.status(500).send("Internal Server Error ");
  }
});

//get data basis of id for edit
app.get("/api/edit-group-menu/:id", async (req, res) => {
  try {
    console.log(req.params);
    const groupData = await MenuGroupModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json(groupData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for edit the data from table
app.put("/api/edit-group-menu/:id", async (req, res) => {
  try {
    const updatedFormData = await MenuGroupModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          // p_id: req.body.p_id,
          groupName: req.body.groupName,
          publish: req.body.publish,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update check box
app.get("/api/update-group-menu-checkbox/:id/:publish", async (req, res) => {
  try {
    const updatedFormData = await MenuGroupModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.params.publish,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for th media module

const mediaSchema = new mongoose.Schema({
  file: String,
});

const MediaModel = mongoose.model("mediaData", mediaSchema);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images/");
  },
  filename: function (req, file, cb) {
    if (file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".").pop()
      );
    } else {
      // Handle the case where file is undefined
      cb(new Error("File is undefined"), null);
    }
  },
});

const upload = multer({ storage: storage });
// Serve static files from the "images" directory
app.use("/Images", express.static("Images"));
app.post("/api/upload-img", upload.single("file"), async (req, res) => {
  try {
    const formData = new MediaModel({
      file: req.file.filename,
    });
    await formData.save();
    res.status(200).send("Form data saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//to get uploaded images into the pop-up
app.get("/api/get-img", async (req, res) => {
  try {
    const formData = await MediaModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const mediaSchema2 = new mongoose.Schema({
  file: String,
});

const MediaModel2 = mongoose.model("mediaData2", mediaSchema2);
//on clicking the add to get the uploaded image and to add  the uploaded images to the table so save

app.get("/api/add/img/:id", async (req, res) => {
  const id = req.params.id;
  const formData = await MediaModel.findById(id);
  console.log(formData);
  try {
    const imgData = new MediaModel2({
      file: formData.file,
    });
    await imgData.save();
    res.status(200).json(imgData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/get-add-img", async (req, res) => {
  try {
    const imgData = await MediaModel2.find();
    res.status(200).json(imgData);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
});

app.delete("/api/delete/img/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MediaModel2.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ error: "Data not found" });
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  } catch (error) {
    console.error(error, "Error in deleting the data ");
    res.status(404).send("Internal server error");
  }
});

//for checkbox
app.post("/api/submit/checkbox-value", async (req, res) => {
  try {
    // Create a new checkbox document and save it to the database
    const checkbox = new MediaModel2({ value: req.body.value });

    console.log(checkbox.value);
    res.json({ checkbox: checkbox.value });
  } catch (error) {
    console.error("Error storing value:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//add video
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  publish: String,
});

const videoModel = mongoose.model("videoData", videoSchema);

//submit video information
app.post("/api/submit/video-data", async (req, res) => {
  try {
    const videoData = new videoModel({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      publish: req.body.publish,
    });
    await videoData.save();
    res.status(200).json(videoData);
    console.log(videoData);
  } catch (error) {
    console.error("error in storing value  ", error);
    res.status(500).send("Internal server error");
  }
});

//get video infromation into the table
app.get("/api/get/video/data", async (req, res) => {
  try {
    const videoData = await videoModel.find();
    res.status(200).json(videoData);
  } catch (error) {
    console.error(error, "error in getting the image");
    res.status(500).send("Internal server error ");
  }
});

//delete the table data
app.delete("/api/delete/video/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const videoData = await videoModel.findByIdAndDelete(id);
    if (!videoData) {
      res.status(404).json({ error: "Video not founded" });
    } else {
      res.status(200).json({ message: " Video deleted successfully  " });
    }
  } catch (error) {
    console.error("Error in deleting the video", error);
    res.status.send("Internal server error ");
  }
});

//update check box
app.get("/api/update-video-checkbox/:id/:publish", async (req, res) => {
  try {
    const updatedFormData = await videoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.params.publish,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// to get the data again into the add video from on the basis of id

app.get("/api/edit/video/data/:id", async (req, res) => {
  try {
    const videoData = await videoModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json(videoData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for edit the data from table
app.put("/api/update/video/data/:id", async (req, res) => {
  try {
    const videoData = await videoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          // p_id: req.body.p_id,
          title: req.body.title,
          description: req.body.description,
          url: req.body.url,
          publish: req.body.publish,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Form data updated successfully", videoData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const settingDataSchema = new mongoose.Schema({
  title: String,
  description: String,
  keyword: String,
});

const settingModel = mongoose.model("settingData", settingDataSchema);

app.post("/api/submit/setting/data", async (req, res) => {
  try {
    const groupData = new settingModel({
      title: "Gallery Page",
      description: "This is a sample gallery page meta description",
      keyword: `meta, keywords, gallery, new tag   `,
    });
    await groupData.save();
    res.status(201).json(groupData);
    console.log(groupData);
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

const videoGallerysettingDataSchema = new mongoose.Schema({
  title: String,
  description: String,
  keyword: String,
  publish: String,
  select: String,
  videoperPage: String,
});

const videoGallerysettingModel = mongoose.model(
  "videoGallerysettingData",
  videoGallerysettingDataSchema
);

app.post("/api/submit/video/gallery/setting/data", async (req, res) => {
  try {
    const groupData = new videoGallerysettingModel({
      title: "Contact meta title",
      description: "contact meta description",
      keyword: "contact, new , keywords",
      publish: req.body.publish,
      select: req.body.select,
      videoperPage: req.body.videoperPage,
    });
    await groupData.save();
    res.status(201).json(groupData);
    console.log(groupData);
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

//mange album
const manageAlbumSchema = new mongoose.Schema({
  name: String,
  editorContent: String,
});

const manageAlbumModel = mongoose.model("manageAlbum", manageAlbumSchema);
app.post("/api/submit/manage/album", async (req, res) => {
  try {
    const AlbumData = new manageAlbumModel({
      name: req.body.name,
      editorContent: req.body.editorContent,
    });
    await AlbumData.save();
    res.status(200).json(AlbumData);
    console.log(AlbumData);
  } catch (error) {
    console.error(error, "Error in submitting the data ");
    res.status(200).send("Internal server error ");
  }
});

app.get("/api/get/album/data", async (req, res) => {
  try {
    const response = await manageAlbumModel.find();
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    console.error(error, "Error in getting the data");
    res.status(500).send("Internal server error");
  }
});

//delete the table data
app.delete("/api/delete/album/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const albumData = await manageAlbumModel.findByIdAndDelete(id);
    if (!albumData) {
      res.status(404).json({ error: "Data not founded" });
    } else {
      res.status(200).json({ message: " Data deleted successfully  " });
    }
  } catch (error) {
    console.error("Error in deleting the data", error);
    res.status.send("Internal server error ");
  }
});

// to get the data again into the add video from on the basis of id

app.get("/api/get/edit/album/data/:id", async (req, res) => {
  try {
    const videoData = await manageAlbumModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json(videoData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update the table data
app.put("/api/update/album/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await manageAlbumModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          editorContent: req.body.editorContent,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Data updated successfully", response });
  } catch (error) {
    console.error("Error in fetching the data ", error);
    res.status(500).json({ error: "Error in updating th data " });
  }
});

//ad slide
const homesliderSchema = new mongoose.Schema({
  file: String,
});
const HomesliderModel = mongoose.model("homesliderdata", homesliderSchema);

//to get uploaded data to send to another page on clicking the add button
app.get("/api/upload/home/slider/img/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const formData = await MediaModel.findById(id);
    if (!formData) {
      console.log(`No data found for ID: ${id}`);
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//to get into add slide page  page
app.get("/api/get-add-home-slider-img", async (req, res) => {
  try {
    const imgData = await HomesliderModel.find();
    res.status(200).json(imgData);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
});

//to delete the data from the addslide
app.delete("/api/delete/home/slider/img/:id", async (req, res) => {
  try {
    const groupData = await HomesliderModel.findByIdAndDelete(req.params.id);
    if (!groupData) {
      return res.status(404).json({ error: " data not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error in deleting the data", error);
    return res.status(500).send("Internal Server Error");
  }
});

// //for checkbox
app.post("/api/submit/home/silder/checkbox-value", async (req, res) => {
  try {
    // Create a new checkbox document and save it to the database
    const checkbox = new HomesliderModel({ value: req.body.value });

    console.log(checkbox.value);
    res.json({ checkbox: checkbox.value });
  } catch (error) {
    console.error("Error storing value:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const sliderSchema = new mongoose.Schema({
  file: Array,
  title: String,
  publish: Number, // Assuming publish is a number based on your radio button values
  editorContent: String,
});

//add slide
const sliderModel = mongoose.model("sliderdata", sliderSchema);

app.post("/api/add", async (req, res) => {
  try {
    // Handle form data

    const newSlide = new sliderModel({
      title: req.body.title,
      publish: req.body.publish,
      editorContent: req.body.editorContent,
      file: req.body.file,
    });
    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (error) {
    console.error("Error adding slide:", error);
    res.status(500).json({ message: "Failed to add slide" });
  }
});
app.get("/api/slides", async (req, res) => {
  try {
    const slides = await sliderModel.find();
    res.status(200).json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//frontpage
app.get("/api/update-slide-checkbox/:id/:publish", async (req, res) => {
  try {
    const updatedFormData = await sliderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.params.publish,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: " data not found" });
    }

    res
      .status(200)
      .json({ message: " data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating  data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to delete the data from the addslide
app.delete("/api/delete/slider/img/:id", async (req, res) => {
  try {
    const groupData = await sliderModel.findByIdAndDelete(req.params.id);
    if (!groupData) {
      return res.status(404).json({ error: " data not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error in deleting the data", error);
    return res.status(500).send("Internal Server Error");
  }
});

//for again fetching data into form
app.get("/api/get-slide-data/:id", async (req, res) => {
  try {
    const formData = await sliderModel.findOne({ _id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//update
app.put("/api/edit/slide/:id", async (req, res) => {
  try {
    const updatedFormData = await sliderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.body.publish,
          title: req.body.title,
          editorContent: req.body.editorContent,
          file: file,
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: " data not found" });
    }

    res
      .status(200)
      .json({ message: " data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating  data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const categorySchema = new mongoose.Schema({
  // Define your form fields here
  name: { type: String },
  slug: { type: String },
});

const CategoryModel = mongoose.model("categorydata", categorySchema);

//to post data dynamically
app.post("/api/submit-category-form", async (req, res) => {
  try {
    const existingUser = await CategoryModel.findOne({ name: req.body.name });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this name already exists" });
    }
    const formData = new CategoryModel({
      name: req.body.name,
      slug: req.body.slug,
    });
    console.log(formData);
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//to get data dynamically
app.get("/api/get-category-data", async (req, res) => {
  try {
    const formData = await CategoryModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for again fetching data basis of id
app.get("/api/get-category-edit-data/:id", async (req, res) => {
  try {
    const formData = await CategoryModel.findOne({ _id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update data
app.put("/api/update-edit-category/:id", async (req, res) => {
  try {
    const updatedFormData = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete/category/:id", async (req, res) => {
  try {
    const deletedFormData = await CategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//blog post
const blogSchema = new mongoose.Schema({
  // Define your form fields here
  name: { type: String },
  slug: { type: String },
  metatitle: { type: String },
  metades: { type: String },
  published: { type: Number },
  frontpage: { type: Number },
  editorContent: { type: String },
  selected: { type: Array },
  url: String,
  htmlContent: String,
  date: Date,
  category: String,
});

const BlogModel = mongoose.model("blogdata", blogSchema);

app.post("/api/submit-blog-form", async (req, res) => {
  try {
    const existingUser = await BlogModel.findOne({ name: req.body.name });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this name already exists" });
    }
    const formData = new BlogModel({
      name: req.body.name,
      slug: req.body.slug,
      metatitle: req.body.metatitle,
      metades: req.body.metades,
      published: req.body.published,
      frontpage: req.body.frontpage,
      editorContent: req.body.editorContent,
      selected: req.body.selected,
      url: req.body.url,
      date: req.body.date,
      category: req.body.category,
    });
    console.log(formData);
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// data dynamically
app.get("/api/get-blog-data", async (req, res) => {
  try {
    const formData = await BlogModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//frontend data show of pages
app.get("/api/get-forntend-blog-data/:id", async (req, res) => {
  try {
    const formData = await BlogModel.findOne({
      _id: req.params.id,
      published: 1,
      frontpage: 1,
    });
    res.status(200).json(formData);
    console.log(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//for again fetching data
app.get("/api/get-blog-edit-data/:id", async (req, res) => {
  try {
    const formData = await BlogModel.findOne({ _id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/delete-blog/:id", async (req, res) => {
  try {
    const deletedFormData = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/edit-blog/:id", async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          metatitle: req.body.metatitle,
          metades: req.body.metades,
          published: req.body.published,
          frontpage: req.body.frontpage,
          editorContent: req.body.editorContent,
          selected: req.body.selected,
          url: req.body.url,
          date: req.body.date,
          category: req.body.category,
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//frontpage
app.get("/api/update-blog-checkbox/:id/:frontpage", async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          frontpage: req.params.frontpage,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//published
app.get("/api/update-blog-checkbox2/:id/:published", async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          published: req.params.published,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/get/category/data", async (req, res) => {
  try {
    const category = await CategoryModel.find();
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });
