import config from "./config.json";
const backendOrigin = config.backend.origin;
// const backendOrigin = process.env.backendOrigin;
export const ep_ = backendOrigin + "/";
export const ep_uploadImage = backendOrigin + "/uploadImage";
export const ep_loadImage = backendOrigin + "/loadImage";
export const ep_deleteImage = backendOrigin + "/deleteImage";
export const ep_deleteRoomCard = backendOrigin + "/deleteRoomCard";
export const ep_testPost = backendOrigin + "/testPost";
export const ep_newRoom = backendOrigin + "/newRoom";
export const ep_loadRoom = backendOrigin + "/loadRoom";
export const ep_signup = backendOrigin + "/signup";
export const ep_signin = backendOrigin + "/signin";
export const ep_auth = backendOrigin + "/auth";
export const ep_loadRoomBy_id = backendOrigin + "/loadRoomBy_id";
export const ep_checkout = backendOrigin + "/checkout";
export const ep_order = backendOrigin + "/order";
export const ep_getOrderByEmail = backendOrigin + "/getOrderByEmail";
export const ep_deleteSessionByOrderId =
  backendOrigin + "/deleteSessionByOrderId";
export const ep_loadOrderByRoom_id = backendOrigin + "/loadOrderByRoom_id";
export const ep_clearExpireSession = backendOrigin + "/clearExpireSession";
export const ep_forgot = backendOrigin + "/forgot";
export const ep_reset = backendOrigin + "/reset";
export const ep_stayIn = backendOrigin + "/stayIn";
export const ep_getSessionIdByOrder_id =
  backendOrigin + "/getSessionIdByOrder_id";
