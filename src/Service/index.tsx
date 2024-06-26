import axios from "axios";
import { setLoader } from "../Stores/actions/loader";
// const BASE_URL = "https://jevar-backend-4j8y.onrender.com";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const Image_URL = "";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("base", BASE_URL);
export const API = {
  normalUser_Register: async (body: any, dispatch: any) => {
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/register`,
        body,
        {
          headers: headers,
        }
      );
      return data;
    } catch (err) {
      console.log("normal user register", err);
    }
  },
  confirmOTP: async (body: any, dispatch: any) => {
    const headers = {
      "content-type": "application/json",
    };
    const data = await axios.post(
      `${BASE_URL}/api/v1/normalUser/confirm`,
      body,
      {
        headers: headers,
      }
    );
    return data;
  },
  normaluser_EmailSendOTP: async (body: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/emailVerify`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normaluser_EmailConfirmOTP: async (body: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/emailConfirm`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_Login: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/login`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_profile: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/normalUser/profile/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_profileWithoutToken: async (id: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/normalUser/profile_get/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_profileEdit: async (
    id: any,
    token: any,
    body: object,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.patch(
        `${BASE_URL}/api/v1/normalUser/edit_profile_image/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_edit: async (id: any, token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.patch(
        `${BASE_URL}/api/v1/normalUser/edit_profile/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_edit: async (id: any, token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/admin/editSales/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_customer_edit: async (token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/customer/edit_customer`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_addImage: async (
    id: any,
    token: any,
    body: object,
    dispatch: any
  ) => {
    // dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.patch(
        `${BASE_URL}/api/v1/normalUser/edit_profile_image/${id}`,
        body,
        {
          headers: headers,
        }
      );
      // dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      // dispatch(setLoader(false));
    }
  },
  normalUser_service_order: async (token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/buyservice/order`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
    }
  },

  mainUser_service_order: async (token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/buyservice/orderMain`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
    }
  },

  normalUser_service_payment: async (
    token: any,
    body: object,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/buyservice/payment`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
    }
  },
  normalUser_add_payment_info: async (
    token: any,
    body: object,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/buyservice/add_payment_info`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  normalUser_add_product: async (token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/product/add_product`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  normalUser_add_productImage: async (
    token: any,
    body: object,
    id: string,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/normalUser/product/add_product_image/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  Common_add_Image: async (
    body: object,

    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/salesUser/add_image`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  normalUser_get_product: async (token: any, id: string, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/normalUser/product/get_product/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  normalUser_edit_product: async (
    token: any,
    id: string,
    body: any,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/normalUser/product/edit_product/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  normalUser_checkProduct_resell: async (
    body: any,
    token: any,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/usedProduct/check_product_for_resell`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_checkProduct_otp: async (body: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/usedProduct/confirm_otp`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_checkProduct_add: async (body: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/usedProduct/add_product_for_resell`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_checkProduct_get: async (
    id: string,
    token: any,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/usedProduct/get_all_product_for_resell/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_checkProduct_Allget: async (dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/usedProduct/get_product_for_resell`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  normalUser_checkProduct_delete: async (
    token: any,
    body: any,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/usedProduct/delete_product-for_resell`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_productDelete: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/delete_product/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_Register: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/register`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_Register: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/salesUser/register`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_verify: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/confirm`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_verify: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/salesUser/confirm`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_Login: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(`${BASE_URL}/api/v1/mainUser/login`, body, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_Login: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/salesUser/login`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_approve: async (
    id: any,
    token: any,
    body: object,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/salesUser/approve-request/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_disable: async (
    id: any,
    token: any,
    body: object,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/admin/editJewellwer/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_Edit: async (id: any, token: any, body: object, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/mainUser/editJewellwer/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  adminUser_Login: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(`${BASE_URL}/api/v1/admin/login`, body, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_fetchCustomer: async (token: any, datas: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/customer/get_customer`,
        datas,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_customerList: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/customer/get_all_customer/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_associated_jeweller: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/salesUser/get_associate_user/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  get_All_sales_user: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(`${BASE_URL}/api/v1/admin/getSalesUser`, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  get_All_jeweller_user: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(`${BASE_URL}/api/v1/admin/getjewellerUser`, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  get_All_user: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(`${BASE_URL}/api/v1/admin/getTotalUser`, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  get_All_user_payment: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(`${BASE_URL}/api/v1/admin/getUserPayment`, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_jeweller_payment: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/salesUser/total_user_remaining_payment/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_getProduct: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/customer/get_product/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },

  get_gold_price: async (city: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/get_gold_price?city=${city}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  salesUser_get: async (dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/salesUser/getSalesUser`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_addProduct: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    console.log("body", body);
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/customer/addproduct`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_addProductPayment: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/jeweller-pay/add`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_fetchProductPayment: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(`${BASE_URL}/api/v1/jeweller-pay/get`, {
        headers: headers,
      });
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  User_fetchMonthIncome: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/salesUser/get_month_income/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  User_fetchPaymentDue: async (id: any, token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/salesUser/user_payment_due/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_editProductPayment: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/jeweller-pay/edit`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },

  mainUser_addCollection: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/collection/add`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_editCollection: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/collection/edit`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_addCollectionImage: async (token: any, body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/collection/addMedia`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },

  mainUser_getCollection: async (token: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/collection/getall`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_deleteCollection: async (token: any, id: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.delete(
        `${BASE_URL}/api/v1/mainUser/collection/remove/${id}`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_deleteCollectionImage: async (
    token: any,
    body: any,
    dispatch: any
  ) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/mainUser/collection/remove_collection_img`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  mainUser_getCollectionComman: async (dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.get(
        `${BASE_URL}/api/v1/mainUser/collection/getallcollection`,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },

  // lost and found
  findProduct: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/findProduct/find_product`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  findProduct_verify_otp: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/findProduct/verify_otp`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
  fetchCategory: async () => {
    const headers = {
      "content-type": "application/json",
    };
    const data = await axios.get(`${BASE_URL}/api/v1/category/getall`, {
      headers: headers,
    });
    return data;
  },
  fetchOffer: async () => {
    const data = await axios.get(`${BASE_URL}/api/v1/offer/getoffer`);
    return data;
  },

  fetchOfferById: async (id:string) => {
    const data = await axios.get(`${BASE_URL}/api/v1/offer/getoffer/${id}`);
    return data;
  },
  editOffer: async (id:string ,body:any) => {
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/offer/edit/${id}`,
        body,
        {
          headers: headers,
        }
        );
        return data;
    } catch (error) {
      console.log(error);
    }
   
  },
  addOffers: async (body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/offer/add`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  addCarrer: async (token: any,body: any, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = await axios.post(
        `${BASE_URL}/api/v1/career/add`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
    }
  },
  deleteOffer: async (id: string) => {
    const data = await axios.delete(`${BASE_URL}/api/v1/offer/delete/${id}`);
    return data;
  },
  editProductBill: async (body: any, id: string, dispatch: any) => {
    // dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "multipart/form-data",
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/normalUser/product/edit_bill/${id}`,
        body,
        {
          headers: headers,
        }
      );
      // dispatch(setLoader(false));
      return data;
    } catch (err) {
      // dispatch(setLoader(false));
      console.log(err);
    }
  },
  editProductdata: async (body: any, id: string, dispatch: any) => {
    dispatch(setLoader(true));
    try {
      const headers = {
        "content-type": "application/json",
      };
      const data = await axios.put(
        `${BASE_URL}/api/v1/normalUser/product/edit_product_console/${id}`,
        body,
        {
          headers: headers,
        }
      );
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  },
};
