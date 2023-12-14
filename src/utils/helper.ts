import isPlainObject from 'lodash/isPlainObject';
import mapKeys from 'lodash/mapKeys';
import trim from 'lodash/trim';
import { HttpStatus } from 'src/common/constants';
import {
  FILE_SIZE_TOO_BIG,
  FILE_UPLOAD_FAILED,
  MAX_NUMBER_OF_IMAGES,
  NOT_ENOUGHT_COINS,
  POST_INVALID_POLICY,
  POST_LIMIT_ACCESS_COUNTRY,
  POST_NOT_EXISTED,
  USER_IS_EXISTED,
  USER_NOT_FOUND
} from 'src/common/constants/responseCode';

export function isValidJSON(str: string) {
  try {
    const object = JSON.parse(str);
    if (object && typeof object === 'object') return true;
    return false;
  } catch (error) {
    return false;
  }
}

export function trimData(body: any): void {
  const trimValue = (item: any) => {
    mapKeys(item, (value, key) => {
      // remove string contain only space characters
      if (typeof value === 'string') {
        item[key] = value.trim();
      }

      // iterate array
      else if (Array.isArray(value)) {
        value.forEach((subValue, index) => {
          // remove string contain only space characters
          if (typeof subValue === 'string') {
            value[index] = trim(subValue);
          } else if (isPlainObject(subValue)) {
            trimValue(subValue);
          }
        });
      } else if (isPlainObject(value)) {
        trimValue(value);
      }
    });
  };

  trimValue(body);
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}

export function hasPermissionToAccessRoute(requiredPermissions: string[]): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;

  // TODO: implement logic later
  return true;
}

export const getAvatarUri = (uri: string) =>
uri ? { uri: uri } : require('src/assets/avatar-default.jpg');

export const handShowErrorMessage = (code: number): string => {
  switch (code) {
    case HttpStatus.NETWORK_ERROR:
      return 'Vui lòng kiểm tra kết nối internet';
    case POST_NOT_EXISTED:
      return 'Bài viết không còn tồn tại.';
    case POST_INVALID_POLICY:
      return 'Bài viết vi phạm chính sách của Fakebook';
    case POST_LIMIT_ACCESS_COUNTRY:
      return 'Bài viết không tồn tại';
    case USER_NOT_FOUND:
      return 'Người dùng không tồn tại';
    case USER_IS_EXISTED:
      return 'Người dùng đã tồn tại';
    case FILE_SIZE_TOO_BIG:
      return 'Tập tin vượt quá size cho phép.Vui lòng chọn lại';
    case FILE_UPLOAD_FAILED:
      return 'Không thể upload file';
    case MAX_NUMBER_OF_IMAGES:
      return 'Vướt quá số ảnh cho phép. Vui lòng chỉ đăng nhiều nhất 4 ảnh';
    case NOT_ENOUGHT_COINS:
      return 'Bạn không đủ coins. Vui lòng nạp thêm coi để tiếp tục';
    default:
      return 'Vui lòng kiểm tra kết nối internet';
  }
};
