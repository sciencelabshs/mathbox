declare var _default: "varying float vClipStrokeWidth;\nvarying float vClipStrokeIndex;\nvarying vec3  vClipStrokeEven;\nvarying vec3  vClipStrokeOdd;\nvarying vec3  vClipStrokePosition;\n\nvoid clipStrokeFragment() {\n  bool odd = mod(vClipStrokeIndex, 2.0) >= 1.0;\n\n  vec3 tangent;\n  if (odd) {\n    tangent = vClipStrokeOdd;\n  }\n  else {\n    tangent = vClipStrokeEven;\n  }\n\n  float travel = dot(vClipStrokePosition, normalize(tangent)) / vClipStrokeWidth;\n  if (mod(travel, 4.0) > 2.0) {\n    discard;\n  }\n}\n";
export default _default;
