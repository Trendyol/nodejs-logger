enum Action {
  PRODUCT_DETAIL_API_PRODUCT_CONTENTS = 'PRODUCT_DETAIL_API_PRODUCT_CONTENTS',
  REVIEW_API_PRODUCT_REVIEWS = 'REVIEW_API_PRODUCT_REVIEWS',
  REVIEW_API_REVIEWS_LIKE = 'REVIEW_API_REVIEWS_LIKE',
  REVIEW_API_ADD_REVIEW_LIKE = 'REVIEW_API_ADD_REVIEW_LIKE',
  REVIEW_API_REMOVE_REVIEW_LIKE = 'REVIEW_API_REMOVE_REVIEW_LIKE',
  SEO_CONTENT_API_SEO_CONTENT_DISPLAY = 'SEO_CONTENT_API_SEO_CONTENT_DISPLAY',
  SEO_CONTENT_API_TOPICS = 'SEO_CONTENT_API_TOPICS',
  SEO_CONTENT_API_QUESTIONS = 'SEO_CONTENT_API_QUESTIONS',
  SEO_CONTENT_API_SUPPORTS = 'SEO_CONTENT_API_SUPPORTS',
  SEO_CONTENT_API_SUGGESTIONS = 'SEO_CONTENT_API_SUGGESTIONS',
  BROWSING_HISTORY_API_USER_HISTORIES = 'BROWSING_HISTORY_API_USER_HISTORIES',
  PRODUCT_SEARCH_API_RESOLVED_QUERIES = 'PRODUCT_SEARCH_API_RESOLVED_QUERIES',
  PRODUCT_SEARCH_API_AGGREGATIONS = 'PRODUCT_SEARCH_API_AGGREGATIONS',
  PRODUCT_SEARCH_API_CAMPAIGNS = 'PRODUCT_SEARCH_API_CAMPAIGNS',
  PRODUCT_SEARCH_API_SEARCH = 'PRODUCT_SEARCH_API_SEARCH',
  SIDE_MENU_JSON_PATH = 'SIDE_MENU_JSON_PATH',
  CATALOG_API_SIZE_CHART = 'CATALOG_API_SIZE_CHART',
  SEARCH_API_PRODUCT_GROUPS = 'SEARCH_API_PRODUCT_GROUPS',
  SEARCH_API_GET_AGGREGATIONS = 'SEARCH_API_GET_AGGREGATIONS',
  ADDRESS_API_COUNTRY = 'ADDRESS_API_COUNTRY',
  ADDRESS_API_CITIES = 'ADDRESS_API_CITIES',
  MOBILE_SERVICE_LOGOUT = 'MOBILE_SERVICE_LOGOUT',
  MOBILE_SERVICE_ADD_TO_BASKET = 'MOBILE_SERVICE_ADD_TO_BASKET',
  MOBILE_SERVICE_GET_BASKET = 'MOBILE_SERVICE_GET_BASKET',
  MOBILE_SERVICE_GET_BASKET_ITEM_COUNT = 'MOBILE_SERVICE_GET_BASKET_ITEM_COUNT',
  FAVORITE_PRODUCT_API_GET_FAVORITES = 'FAVORITE_PRODUCT_API_GET_FAVORITES',
  FAVORITE_PRODUCT_API_POST_FAVORITE = 'FAVORITE_PRODUCT_API_POST_FAVORITE',
  FAVORITE_PRODUCT_API_DELETE_FAVORITE = 'FAVORITE_PRODUCT_API_DELETE_FAVORITE',
  FAVORITE_API_LIST_BY_BOUTIQUE_ID = 'FAVORITE_API_LIST_BY_BOUTIQUE_ID',
  FAVORITE_API_LIST_BY_BOUTIQUE_ID_LIST = 'FAVORITE_API_LIST_BY_BOUTIQUE_ID_LIST',
  FAVORITE_API_ADD_FAVORITE = 'FAVORITE_API_ADD_FAVORITE',
  FAVORITE_API_DELETE_FAVORITE = 'FAVORITE_API_DELETE_FAVORITE',
  FAVORITE_API_IS_FAVORITE = 'FAVORITE_API_IS_FAVORITE',
  ORDER_API_CORE_ORDERS = 'ORDER_API_CORE_ORDERS',
  AUTHORIZATION_API_TOKENS_VALIDATE = 'AUTHORIZATION_API_TOKENS_VALIDATE',
  USER_API_GET_USER = 'USER_API_GET_USER',
  USER_ACCOUNT_API_GET_USER_ADDRESSES = 'USER_ACCOUNT_API_GET_USER_ADDRESSES',
  USER_ACCOUNT_API_DELETE_USER_ADDRESS = 'USER_ACCOUNT_API_DELETE_USER_ADDRESS',
  USER_ACCOUNT_API_ADD_USER_ADDRESS = 'USER_ACCOUNT_API_ADD_USER_ADDRESS',
  USER_ACCOUNT_API_UPDATE_USER_ADDRESS = 'USER_ACCOUNT_API_UPDATE_USER_ADDRESS',
  SUGGESTION_API_SUGGESTIONS = 'SUGGESTION_API_SUGGESTIONS',
  CUSTOM = 'CUSTOM'
}

type ActionType = Action | string;

export { Action, ActionType };
