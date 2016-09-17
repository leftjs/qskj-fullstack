/**
 * Created by zhangjiasheng on 7/23/16.
 */

// 登录
export const LOGIN = "LOGIN"
// 登出
export const LOGOUT = "LOGOUT"
// 注册
export const REGISTER = "REGISTER"
// 添加商品或者更新商品信息
export const ADD_PRODUCT = "ADD_PRODUCT"
// 分页获取商品
export const GET_PRODUCT_BY_PAGE_AND_SIZE = "GET_PRODUCT_BY_PAGE_AND_SIZE"
// 获取所有商品
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
// 根据产品id删除产品
export const DELETE_PRODUCT_BY_ID = 'DELETE_PRODUCT_BY_ID'
// 添加用户或更新用户信息
export const ADD_USER = "ADD_USER"
// 分页获取用户列表
export const GET_USER_BY_PAGE_AND_SIZE = "GET_USER_BY_PAGE_AND_SIZE"
// 获取所有用户列表
export const GET_ALL_USERS = "GET_ALL_USERS"
// 删除指定用户
export const DELETE_USER_BY_ID = "DELETE_USER_BY_ID"
// 审批指定用户
export const VALIDATE_USER_BY_ID = 'VALIDATE_USER_BY_ID'
// 添加或更新供应商
export const ADD_SUPPLIER = 'ADD_SUPPLIER'
// 分页获取供应商列表
export const GET_SUPPLIERS_BY_PAGE_AND_SIZE = 'GET_SUPPLIERS_BY_PAGE_AND_SIZE'
// 获取所有的供应商列表
export const GET_ALL_SUPPLIERS = 'GET_ALL_SUPPLIERS'
// 删除指定供应商
export const DELETE_SUPPLIER_BY_ID = 'DELETE_SUPPLIER_BY_ID'


// admin
// -------------------------------------------------
// front

// 获取城市列表
export const GET_CITY_LIST = "GET_CITY_LIST"
// 上传单个文件
export const UPLOAD_SINGLE = 'UPLOAD_SINGLE'

// 前台登录
export const LOGIN_FRONT = "LOGIN_FRONT"

// 购物车
// 指定商品数量添加1
export const ITEM_ADD = 'ITEM_ADD'
// 指定商品数量减少1
export const ITEM_DELETE = 'ITEM_DELETE'
// 设置指定商品数量
export const ITEM_SET = 'ITEM_SET'


// 用户注册
export const SEND_VALIDATION_MAIL = 'SEND_VALIDATION_MAIL'
// 个人用户注册
export const REGISTER_PERSONAL = 'REGISTER_PERSONAL'
// 企业用户注册
export const REGISTER_COMPANY = 'REGISTER_COMPANY'