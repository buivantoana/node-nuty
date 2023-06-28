import jwt from "jsonwebtoken";
import { Op, Sequelize } from "sequelize";
import db from "../models/index";
const bcrypt = require("bcrypt");
import Cookies from "cookies";

const addcategory = async (req, res) => {
  try {
    let categoryname = req.body.categoryname;
    let icon = req.body.icon;

    const [user, created] = await db.Category.findOrCreate({
      where: { categoryname: categoryname },
      defaults: {
        categoryname: categoryname,
        icon: icon,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 1,
        message: "category da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const updatecategory = async (req, res) => {
  try {
    let categoryname = req.body.categoryname;
    let icon = req.body.icon;
    let id = req.body.id;

    await db.Category.update(
      { categoryname: categoryname, icon: icon },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const deletecategory = async (req, res) => {
  try {
    let id = req.body.id;

    await db.Category.destroy({ where: { id: id } });

    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getcategory = async (req, res) => {
  try {
    const data = await db.Category.findAll({
      include: [{ model: db.Role, as: "all" }],
      nest: true,
      raw: false,
    });

    return res.status(200).json({
      status: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const addrole = async (req, res) => {
  try {
    let rolename = req.body.rolename;
    let categoryid = req.body.categoryid;

    const [user, created] = await db.Role.findOrCreate({
      where: { rolename: rolename },
      defaults: {
        categoryid: categoryid,
        Rolename: rolename,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 1,
        message: "role da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getrole = async (req, res) => {
  try {
    const data = await db.Role.findAll({
      include: [{ model: db.Category, as: "all" }],
      nest: true,
      raw: false,
    });

    return res.status(200).json({
      status: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const updaterole = async (req, res) => {
  try {
    let id = req.body.id;
    let Rolename = req.body.Rolename;

    await db.Role.update(
      {
        Rolename: Rolename,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 0,
      message: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const getroletype = async (req, res) => {
  try {
    let id = req.body.id;
    const data = await db.Role.findAll({
      where: {
        categoryid: id,
      },
    });

    return res.status(200).json({
      status: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const getbrand = async (req, res) => {
  try {
    let limit = req.body.limit;
    if (limit === "full") {
      const data = await db.Brand.findAll();
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else {
      const data = await db.Brand.findAll({
        limit,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const updatebrand = async (req, res) => {
  try {
    let brandname = req.body.brandname;
    let id = req.body.id;

    await db.Brand.update(
      {
        brandname: brandname,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      status: 0,
      message: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const addbrand = async (req, res) => {
  try {
    let brandname = req.body.brandname;
    let image = req.body.image;

    const [user, created] = await db.Brand.findOrCreate({
      where: { brandname: brandname },
      defaults: {
        image: image,
        brandname: brandname,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 0,
        message: "brand da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const gettypebrand = async (req, res) => {
  try {
    let type = req.body.type;
    if (+type === 0) {
      const data = await db.Brand.findAll({
        where: {
          [Op.or]: [
            { brandname: { [Op.startsWith]: "0" } },
            { brandname: { [Op.startsWith]: "1" } },
            { brandname: { [Op.startsWith]: "2" } },
            { brandname: { [Op.startsWith]: "3" } },
            { brandname: { [Op.startsWith]: "4" } },
            { brandname: { [Op.startsWith]: "5" } },
            { brandname: { [Op.startsWith]: "6" } },
            { brandname: { [Op.startsWith]: "7" } },
            { brandname: { [Op.startsWith]: "8" } },
            { brandname: { [Op.startsWith]: "9" } },
          ],
        },
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else {
      const data = await db.Brand.findAll({
        where: {
          brandname: { [Op.like]: `${type}%` },
        },
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addproduct = async (req, res) => {
  try {
    let types = req.body.types;
    let productname = req.body.productname;
    let category_id = req.body.category_id;
    let brand_id = req.body.brand_id;
    let role_id = req.body.role_id;
    let productdes = req.body.productdes;
    let price = req.body.price;
    let saleprice = req.body.saleprice;
    let type = req.body.type;
    let image = req.body.image;
    let present = req.body.present;

    if (types === "csd") {
      const [user, created] = await db.ProductCSD.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "csct") {
      const [user, created] = await db.ProductCSCT.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "tđ") {
      const [user, created] = await db.ProductTD.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "cstvdđ") {
      const [user, created] = await db.ProductCSTVDD.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "tpc") {
      const [user, created] = await db.ProductTPCN.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "nh") {
      const [user, created] = await db.ProductNH.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "pklđ") {
      const [user, created] = await db.ProductPKLD.findOrCreate({
        where: { productname: productname },
        defaults: {
          productname: productname,
          brand_id: brand_id,
          category_id: category_id,
          role_id: role_id,
          productdes: productdes,
          price: price,
          saleprice: saleprice,
          image: image,
          type: type,
          present: present,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "brand da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const updateproduct = async (req, res) => {
  try {
    let types = req.body.types;
    let productname = req.body.productname;
    let productdes = req.body.productdes;
    let price = req.body.price;
    let saleprice = req.body.saleprice;
    let type = req.body.type;
    let present = req.body.present;
    let id = req.body.id;

    if (types === "csd") {
      await db.ProductCSD.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );

      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "csct") {
      await db.ProductCSCT.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "td") {
      await db.ProductTD.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "cstvdd") {
      await db.ProductCSTVDD.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "tpcn") {
      await db.ProductTPCN.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "nh") {
      await db.ProductNH.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "pkld") {
      await db.ProductPKLD.update(
        {
          productname: productname,

          productdes: productdes,
          price: price,
          saleprice: saleprice,

          type: type,
          present: present,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getproduct = async (req, res) => {
  try {
    let limit = req.body.limit;
    let types = req.body.types;

    let offset = req.body.offset;

    if (limit !== 0) {
      if (types === "csd") {
        let count = await db.ProductCSD.count();
        let data = await db.ProductCSD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "csct") {
        let count = await db.ProductCSCT.count();
        let data = await db.ProductCSCT.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "tđ") {
        let count = await db.ProductTD.count();
        let data = await db.ProductTD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "cstvdđ") {
        let count = await db.ProductCSTVDD.count();
        let data = await db.ProductCSTVDD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "tpc") {
        let count = await db.ProductTPCN.count();
        let data = await db.ProductTPCN.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "nh") {
        let count = await db.ProductNH.count();
        let data = await db.ProductNH.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "pklđ") {
        let count = await db.ProductPKLD.count();
        let data = await db.ProductPKLD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }
        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      }
    }
    if (types === "csd") {
      let data = await db.ProductCSD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "csct") {
      let data = await db.ProductCSCT.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tđ") {
      let data = await db.ProductTD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "cstvdđ") {
      let data = await db.ProductCSTVDD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tpc") {
      let data = await db.ProductTPCN.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "nh") {
      let data = await db.ProductNH.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "pklđ") {
      let data = await db.ProductPKLD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getproductcategory = async (req, res) => {
  try {
    let limit = req.body.limit;
    let types = req.body.types;
    let offset = req.body.offset;
    let role_id = req.body.role_id;
    if (limit !== 0) {
      if (types === "csd") {
        let count = await db.ProductCSD.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductCSD.findAll({
          where: {
            role_id: role_id,
          },
          limit,
          offset,
          include: [{ model: db.Category }],

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "csct") {
        let count = await db.ProductCSCT.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductCSCT.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "tđ") {
        let count = await db.ProductTD.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductTD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "cstvdđ") {
        let count = await db.ProductCSTVDD.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductCSTVDD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "tpc") {
        let count = await db.ProductTPCN.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductTPCN.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "nh") {
        let count = await db.ProductNH.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductNH.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });
        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      } else if (types === "pklđ") {
        let count = await db.ProductPKLD.count({
          where: {
            role_id: role_id,
          },
        });
        let data = await db.ProductPKLD.findAll({
          limit,
          offset,
          include: [{ model: db.Category }],
          where: {
            role_id: role_id,
          },

          nest: true,
          raw: false,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }
        return res.status(200).json({
          status: 0,
          data: data,
          count: count,
          limit: limit,
          page: 1,
        });
      }
    }
    if (types === "csd") {
      let data = await db.ProductCSD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "csct") {
      let data = await db.ProductCSCT.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tđ") {
      let data = await db.ProductTD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "cstvdđ") {
      let data = await db.ProductCSTVDD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tpc") {
      let data = await db.ProductTPCN.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "nh") {
      let data = await db.ProductNH.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "pklđ") {
      let data = await db.ProductPKLD.findAll({
        include: [{ model: db.Category }],

        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getproductitem = async (req, res) => {
  try {
    let types = req.body.types;
    let product_id = req.body.product_id;

    if (types === "csd") {
      let data = await db.ProductCSD.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],

        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "csct") {
      let data = await db.ProductCSCT.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tđ") {
      let data = await db.ProductTD.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "cstvdđ") {
      let data = await db.ProductCSTVDD.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tpc") {
      let data = await db.ProductTPCN.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "nh") {
      let data = await db.ProductNH.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "pklđ") {
      let data = await db.ProductPKLD.findAll({
        where: {
          id: product_id,
        },
        include: [
          { model: db.Brand },
          { model: db.Star },
          { model: db.Present },
        ],
        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
          if (data[i].Presents.length > 0) {
            data[i].Presents[i].image = new Buffer(
              data[i].Presents[i].image,
              "base64"
            ).toString("binary");
          }
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const adddetailimg = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let image = req.body.image;
    let types = req.body.types;

    if (types === "csd") {
      const [user, created] = await db.DetailCSD.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "csct") {
      const [user, created] = await db.DetailCSCT.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "td") {
      const [user, created] = await db.DetailTD.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "cstvdd") {
      const [user, created] = await db.DetailCSTVDD.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "tpcn") {
      const [user, created] = await db.DetailTPCN.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "nh") {
      const [user, created] = await db.DetailNH.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "pkld") {
      const [user, created] = await db.DetailPKLD.findOrCreate({
        where: { image: image },
        defaults: {
          image: image,
          product_id: product_id,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const adddetaildes = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let introduce = req.body.introduce;
    let ingredient = req.body.ingredient;
    let uses = req.body.user;
    let use = req.body.use;
    let parameter = req.body.parameter;
    let types = req.body.types;

    if (types === "csd") {
      const [user, created] = await db.DetaildesCSD.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "csct") {
      const [user, created] = await db.DetaildesCSCT.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "td") {
      const [user, created] = await db.DetaildesTD.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "cstvdd") {
      const [user, created] = await db.DetaildesCSTVDD.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "tpcn") {
      const [user, created] = await db.DetaildesTPCN.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "nh") {
      const [user, created] = await db.DetaildesNH.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    } else if (types === "pkld") {
      const [user, created] = await db.DetaildesPKLD.findOrCreate({
        where: { product_id: product_id },
        defaults: {
          product_id: product_id,
          introduce: introduce,
          ingredient: ingredient,
          uses: uses,
          use: use,
          parameter: parameter,
        },
      });
      if (!created) {
        return res.status(200).json({
          status: 1,
          message: "detail da ton tai",
        });
      }
      return res.status(200).json({
        status: 0,
        message: "thanh cong",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getdetailimg = async (req, res) => {
  try {
    let types = req.body.types;
    let product_id = req.body.product_id;

    if (types === "csd") {
      let data = await db.DetailCSD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "csct") {
      let data = await db.DetailCSCT.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tđ") {
      let data = await db.DetailTD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "cstvdđ") {
      let data = await db.DetailCSTVDD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tpc") {
      let data = await db.DetailTPCN.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "nh") {
      let data = await db.DetailNH.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "pklđ") {
      let data = await db.DetailPKLD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getdetaildes = async (req, res) => {
  try {
    let types = req.body.types;
    let product_id = req.body.product_id;

    if (types === "csd") {
      let data = await db.DetaildesCSD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "csct") {
      let data = await db.DetaildesCSCT.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tđ") {
      let data = await db.DetaildesTD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "cstvdđ") {
      let data = await db.DetaildesCSTVDD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "tpc") {
      let data = await db.DetaildesTPCN.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "nh") {
      let data = await db.DetaildesNH.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    } else if (types === "pklđ") {
      let data = await db.DetaildesPKLD.findAll({
        where: {
          product_id: product_id,
        },

        nest: true,
        raw: false,
      });

      return res.status(200).json({
        status: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const adduser = async (req, res) => {
  try {
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;

    const [user, created] = await db.Custumer.findOrCreate({
      where: { email: email },
      defaults: {
        name: name,
        address: address,
        phone: phone,
        email: email,
        password: password,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 1,
        message: "User da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const loginuser = async (req, res) => {
  try {
    let email = req.body.username;

    let password = req.body.password;

    let data = await db.Custumer.findAll({
      where: { email: email, password: password },
    });

    if (data && data.length) {
      let token = jwt.sign(
        {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone,
          address: data[0].address,
        },
        "toan"
      );
      res.cookie("token", token, {
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({
        status: 0,
        data: token,
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "tai khoan mat khau sai",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const logoutuser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("token_user");

    return res.status(200).json({
      status: 0,
      message: "Đăng xuất Thành Công",
    });
  } catch (e) {
    console.log(e);
  }
};
const authentication = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    let [arr, arr2] = authorizationHeader.split(" ");
    let cookie = req.cookies.token;
    if (arr2 === cookie) {
      var decoded = jwt.verify(cookie, "toan");
      res.cookie("token_user", JSON.stringify(decoded), {
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({
        status: 0,
        data: decoded,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addcart = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let custumer_id = req.body.custumer_id;
    let productname = req.body.productname;
    let price = req.body.price;
    let quancityclient = req.body.quancity;
    let image = req.body.image;

    const [user, created] = await db.Cart.findOrCreate({
      where: { product_id: product_id, productname: productname },
      defaults: {
        product_id: product_id,
        custumer_id: custumer_id,
        productname: productname,
        price: price,
        quancity: quancityclient,
        image: image,
      },
    });

    if (!created) {
      await db.Cart.update(
        { quancity: quancityclient + user.quancity },
        {
          where: {
            id: user.id,
          },
        }
      );
      return res.status(200).json({
        status: 1,
        message: "bạn đã thêm số lượng sản phẩm thành công",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getcart = async (req, res) => {
  try {
    let id = req.body.id;

    let data = await db.Cart.findAll({
      where: { custumer_id: id },
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    return res.status(200).json({
      status: 1,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const deletecart = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Cart.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const updatecart = async (req, res) => {
  try {
    let custumer_id = req.body.custumer_id;
    let quancity = req.body.quancity;
    let promises = [];
    let data = await db.Cart.findAll({
      where: { custumer_id: custumer_id },
    });
    async function promiseupdatecart(id, qct) {
      await db.Cart.update(
        { quancity: qct },
        {
          where: {
            product_id: id,
          },
        }
      );
    }
    if (data && data.length) {
      quancity.map((item, index) => {
        let id = data[index].product_id;
        let qct = item;
        return promises.push(promiseupdatecart(id, qct));
      });

      await Promise.all(promises);
    }

    return res.status(200).json({
      status: 1,
      message: "bạn đã thêm số lượng sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};
const addorder = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let custumer_id = req.body.custumer_id;
    let productname = req.body.productname;
    let price = req.body.price;
    let quancity = req.body.quancity;
    let image = req.body.image;
    let address = req.body.address;
    let status = req.body.status;
    let phone = req.body.phone;
    let deliveryaddress = req.body.deliveryaddress;
    let city = req.body.city;
    let description = req.body.description;
    let name = req.body.name;

    await db.Order.create({
      product_id: product_id,
      productname: productname,
      custumer_id: custumer_id,
      quancity: quancity,
      price: price,
      image: image,
      status: status,
      phone: phone,
      deliveryaddress: deliveryaddress,
      name: name,
      address: address,
      city: city,
      description: description,
    });

    return res.status(200).json({
      status: 1,
      message: "bạn đã order sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};

const getorder = async (req, res) => {
  try {
    let id = req.body.id;

    let data = await db.Order.findAll({
      where: { custumer_id: id },
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    return res.status(200).json({
      status: 1,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const deleteorder = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Order.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const addstar = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let star = req.body.star;

    await db.Star.create({
      product_id: product_id,
      star: star,
    });

    return res.status(200).json({
      status: 1,
      message: "bạn đã đánh giá sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};

const addcomment = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let star = req.body.star;
    let name = req.body.name;
    let description = req.body.description;
    let custumer_id = req.body.custumer_id;

    let now = req.body.now;
    await db.Comment.create({
      product_id: product_id,
      raiting: star,
      name: name,
      description: description,
      custumer_id: custumer_id,
      now: now,
    });

    return res.status(200).json({
      status: 1,
      message: "bạn đã đánh giá sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};
const getcomment = async (req, res) => {
  try {
    let id = req.body.id;

    let data = await db.Comment.findAll({
      where: { product_id: id },
      include: [{ model: db.Commentchild, as: "commentall" }],
      nest: true,
      raw: false,
    });

    return res.status(200).json({
      status: 1,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const updatecomment = async (req, res) => {
  try {
    let description = req.body.description;
    let raiting = req.body.raiting;
    let id = req.body.id;

    await db.Comment.update(
      {
        description: description,
        raiting: raiting,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 1,
      message: "bạn đã thêm số lượng sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};
const destroycomment = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Comment.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 1,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const addcommentchild = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let comment_id = req.body.comment_id;
    let name = req.body.name;
    let description = req.body.description;
    let custumer_id = req.body.custumer_id;
    let now = req.body.now;
    await db.Commentchild.create({
      product_id: product_id,
      comment_id: comment_id,
      name: name,
      description: description,
      custumer_id: custumer_id,
      now: now,
    });

    return res.status(200).json({
      status: 1,
      message: "bạn đã đánh giá sản phẩm thành công",
    });
  } catch (e) {
    console.log(e);
  }
};
const deletecommentchild = async (req, res) => {
  try {
    let id = req.body.id;

    await db.Commentchild.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 1,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const deleteallcommentchild = async (req, res) => {
  try {
    let id = req.body.id;

    await db.Commentchild.destroy({
      where: {
        comment_id: id,
      },
    });

    return res.status(200).json({
      status: 1,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const getallproductpresent = async (req, res) => {
  try {
    let CSD = await db.ProductCSD.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let CSCT = await db.ProductCSCT.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let TD = await db.ProductTD.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let CSTVDD = await db.ProductCSTVDD.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let PKLD = await db.ProductPKLD.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let NH = await db.ProductNH.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let TPCN = await db.ProductTPCN.findAll({
      where: { present: 1 },
      attributes: {
        exclude: [
          "image",
          "brand_id",
          "category_id",
          "role_id",
          "productdes",
          "price",
          "saleprice",
          "type",
        ],
      },
    });
    let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);

    return res.status(200).json({
      status: 1,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const addpresent = async (req, res) => {
  try {
    let product_id = req.body.product_id;

    let presentname = req.body.presentname;

    let image = req.body.image;

    const [user, created] = await db.Present.findOrCreate({
      where: { product_id: product_id, presentname: presentname },
      defaults: {
        product_id: product_id,

        presentname: presentname,

        image: image,
      },
    });

    if (!created) {
      await db.Present.update(
        {
          presentname: presentname,

          image: image,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      return res.status(200).json({
        status: 1,
        message: "bạn đã thêm số lượng sản phẩm thành công",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const searchproduct = async (req, res) => {
  try {
    let limit = req.body.limit;
    let search = req.body.search;
    let offset = req.body.offset;

    let CSD = await db.ProductCSD.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let CSCT = await db.ProductCSCT.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let TD = await db.ProductTD.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let CSTVDD = await db.ProductCSTVDD.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let PKLD = await db.ProductPKLD.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let NH = await db.ProductNH.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let TPCN = await db.ProductTPCN.findAll({
      where: { productname: { [Op.like]: `%${search}%` } },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
    if (data.length > 0) {
      let count = data.length;
      if (data && data.length) {
        let datapage = data.slice(offset, limit);

        if (datapage) {
          for (let i = 0; i < datapage.length; i++) {
            datapage[i].image = new Buffer(
              datapage[i].image,
              "base64"
            ).toString("binary");
          }
        }

        return res.status(200).json({
          status: 1,
          data: datapage,
          count: count,
          limit: limit,
        });
      }
    } else {
      return res.status(200).json({
        status: 1,
        data: [],
        count: 0,
        limit: 8,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getsaleproduct = async (req, res) => {
  try {
    let id = req.body.id;
    let limit = req.body.limit;
    let offset = req.body.offset;

    if (+id === 1) {
      let data = await db.ProductCSD.findAll({
        limit: 10,
        offset,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let count = data.length;
      if (data && data.length) {
        let datapage = data.slice(offset, limit);

        if (datapage) {
          for (let i = 0; i < datapage.length; i++) {
            datapage[i].image = new Buffer(
              datapage[i].image,
              "base64"
            ).toString("binary");
          }
        }

        return res.status(200).json({
          status: 1,
          data: datapage,
          count: count,
          limit: limit,
        });
      } else {
        return res.status(200).json({
          status: 1,
          data: [],
          count: 0,
          limit: 0,
        });
      }
    } else if (+id === 2) {
      let CSD = await db.ProductCSD.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSCT = await db.ProductCSCT.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TD = await db.ProductTD.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSTVDD = await db.ProductCSTVDD.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let PKLD = await db.ProductPKLD.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let NH = await db.ProductNH.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TPCN = await db.ProductTPCN.findAll({
        where: { present: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
      if (data.length > 0) {
        let count = data.length;
        if (data && data.length) {
          let datapage = data.slice(offset, limit);

          if (datapage) {
            for (let i = 0; i < datapage.length; i++) {
              datapage[i].image = new Buffer(
                datapage[i].image,
                "base64"
              ).toString("binary");
            }
          }

          return res.status(200).json({
            status: 1,
            data: datapage,
            count: count,
            limit: limit,
          });
        }
      } else {
        return res.status(200).json({
          status: 1,
          data: [],
          count: 0,
          limit: 0,
        });
      }
    } else if (+id === 3) {
      let CSD = await db.ProductCSD.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSCT = await db.ProductCSCT.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TD = await db.ProductTD.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSTVDD = await db.ProductCSTVDD.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let PKLD = await db.ProductPKLD.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let NH = await db.ProductNH.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TPCN = await db.ProductTPCN.findAll({
        where: { type: 2 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
      if (data.length > 0) {
        let count = data.length;
        if (data && data.length) {
          let datapage = data.slice(offset, limit);

          if (datapage) {
            for (let i = 0; i < datapage.length; i++) {
              datapage[i].image = new Buffer(
                datapage[i].image,
                "base64"
              ).toString("binary");
            }
          }

          return res.status(200).json({
            status: 1,
            data: datapage,
            count: count,
            limit: limit,
          });
        }
      } else {
        return res.status(200).json({
          status: 1,
          data: [],
          count: 0,
          limit: 0,
        });
      }
    } else if (+id === 4) {
      let CSD = await db.ProductCSD.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSCT = await db.ProductCSCT.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TD = await db.ProductTD.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSTVDD = await db.ProductCSTVDD.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let PKLD = await db.ProductPKLD.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let NH = await db.ProductNH.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TPCN = await db.ProductTPCN.findAll({
        where: { type: 1 },
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
      if (data.length > 0) {
        let count = data.length;
        if (data && data.length) {
          let datapage = data.slice(offset, limit);

          if (datapage) {
            for (let i = 0; i < datapage.length; i++) {
              datapage[i].image = new Buffer(
                datapage[i].image,
                "base64"
              ).toString("binary");
            }
          }

          return res.status(200).json({
            status: 1,
            data: datapage,
            count: count,
            limit: limit,
          });
        }
      } else {
        return res.status(200).json({
          status: 1,
          data: [],
          count: 0,
          limit: 0,
        });
      }
    } else if (+id === 5) {
      let CSD = await db.ProductCSD.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSCT = await db.ProductCSCT.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TD = await db.ProductTD.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let CSTVDD = await db.ProductCSTVDD.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let PKLD = await db.ProductPKLD.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let NH = await db.ProductNH.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let TPCN = await db.ProductTPCN.findAll({
        limit: 3,
        include: [{ model: db.Category }],
        raw: true,
        nest: true,
      });
      let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
      if (data.length > 0) {
        let count = data.length;
        if (data && data.length) {
          let datapage = data.slice(offset, limit);

          if (datapage) {
            for (let i = 0; i < datapage.length; i++) {
              datapage[i].image = new Buffer(
                datapage[i].image,
                "base64"
              ).toString("binary");
            }
          }

          return res.status(200).json({
            status: 1,
            data: datapage,
            count: count,
            limit: limit,
          });
        }
      } else {
        return res.status(200).json({
          status: 1,
          data: [],
          count: 0,
          limit: 0,
        });
      }
    } else if (+id === 6) {
      return res.status(200).json({
        status: 1,
        data: [],
        count: 0,
        limit: 0,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const addcategorymagazile = async (req, res) => {
  try {
    let categorymagazilename = req.body.categorymagazilename;

    const [user, created] = await db.Categorymagazile.findOrCreate({
      where: { categorymagazilename: categorymagazilename },
      defaults: {
        categorymagazilename: categorymagazilename,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 1,
        message: "category da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getcategorymagazile = async (req, res) => {
  try {
    const data = await db.Categorymagazile.findAll();

    return res.status(200).json({
      status: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const addmagazile = async (req, res) => {
  try {
    let magazilename = req.body.magazilename;
    let image = req.body.image;
    let date = req.body.date;
    let magaziledes = req.body.magaziledes;
    let categorymagazile_id = req.body.categorymagazile_id;

    const [user, created] = await db.Magazile.findOrCreate({
      where: { magazilename: magazilename },
      defaults: {
        magazilename: magazilename,
        magaziledes: magaziledes,
        image: image,
        categorymagazile_id: categorymagazile_id,
        date: date,
      },
    });
    if (!created) {
      return res.status(200).json({
        status: 1,
        message: "magazile da ton tai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getmagazile = async (req, res) => {
  try {
    const data = await db.Magazile.findAll();
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }

    return res.status(200).json({
      status: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const getbrandproduct = async (req, res) => {
  try {
    let limit = req.body.limit;
    let id = req.body.id;
    let offset = req.body.offset;

    let CSD = await db.ProductCSD.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let CSCT = await db.ProductCSCT.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let TD = await db.ProductTD.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let CSTVDD = await db.ProductCSTVDD.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let PKLD = await db.ProductPKLD.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let NH = await db.ProductNH.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let TPCN = await db.ProductTPCN.findAll({
      where: { brand_id: id },
      include: [{ model: db.Category }],
      raw: true,
      nest: true,
    });
    let data = CSD.concat(CSCT, TD, TPCN, CSTVDD, NH, PKLD);
    if (data.length > 0) {
      let count = data.length;
      if (data && data.length) {
        let datapage = data.slice(offset, limit);

        if (datapage) {
          for (let i = 0; i < datapage.length; i++) {
            datapage[i].image = new Buffer(
              datapage[i].image,
              "base64"
            ).toString("binary");
          }
        }

        return res.status(200).json({
          status: 1,
          data: datapage,
          count: count,
          limit: limit,
        });
      }
    } else {
      return res.status(200).json({
        status: 1,
        data: [],
        count: 0,
        limit: 8,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  addcategory,
  updatecategory,
  deletecategory,
  getcategory,
  addrole,
  updaterole,
  getrole,
  getbrand,
  updatebrand,
  addbrand,
  gettypebrand,
  addproduct,
  getproduct,
  getproductcategory,
  getroletype,
  adddetailimg,
  adddetaildes,
  getproductitem,
  getdetailimg,
  getdetaildes,
  adduser,
  loginuser,
  authentication,
  addcart,
  getcart,
  updatecart,
  addorder,
  deletecart,
  getorder,
  deleteorder,
  addstar,
  addcomment,
  getcomment,
  updatecomment,
  destroycomment,
  addcommentchild,
  deletecommentchild,
  deleteallcommentchild,
  updateproduct,
  getallproductpresent,
  addpresent,
  searchproduct,
  getsaleproduct,
  addcategorymagazile,
  getcategorymagazile,
  addmagazile,
  getmagazile,
  getbrandproduct,
  logoutuser,
};
