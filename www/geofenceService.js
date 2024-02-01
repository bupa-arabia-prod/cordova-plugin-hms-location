"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeofenceServiceImpl = void 0;
/*
    Copyright 2020-2022. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
const utils_1 = require("./utils");
class GeofenceServiceImpl {
    createGeofenceList(requestCode, geofences, initConversions, coordinateType, callback) {
        if (typeof callback !== "undefined") {
            return this.run('createGeofenceList', [requestCode, [geofences, initConversions, coordinateType], callback.toString()]);
        }
        else {
            return this.run('createGeofenceList', [requestCode, [geofences, initConversions, coordinateType]]);
        }
    }
    deleteGeofenceList(requestCode) {
        return this.run('deleteGeofenceList', [requestCode]);
    }
    run(funcName, args = []) {
        args.unshift(funcName);
        return utils_1.asyncExec('HMSLocation', 'GeofenceService', args);
    }
}
exports.GeofenceServiceImpl = GeofenceServiceImpl;
//# sourceMappingURL=geofenceService.js.map