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






// app.use("/api",loginRoute);
// app.use("/api",pageRoute);
// app.use("/api",menuRoute);
// app.use("/api",subMenuRoute);