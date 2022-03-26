declare var _default: "uniform vec4 geometryClip;\nattribute vec4 position4;\nattribute vec3 strip;\n\n// External\nvec3 getPosition(vec4 xyzw, float canonical);\n\nvarying vec3 vNormal;\nvarying vec3 vLight;\nvarying vec3 vPosition;\n\nvoid getStripGeometry(vec4 xyzw, vec3 strip, out vec3 pos, out vec3 normal) {\n  vec3 a, b, c;\n\n  a   = getPosition(xyzw, 1.0);\n  b   = getPosition(vec4(xyzw.xyz, strip.x), 0.0);\n  c   = getPosition(vec4(xyzw.xyz, strip.y), 0.0);\n\n  normal = normalize(cross(c - a, b - a)) * strip.z;\n  \n  pos = a;\n}\n\nvec3 getStripPositionNormal() {\n  vec3 center, normal;\n\n  vec4 p = min(geometryClip, position4);\n\n  getStripGeometry(p, strip, center, normal);\n  vNormal   = normal;\n  vLight    = normalize((viewMatrix * vec4(1.0, 2.0, 2.0, 0.0)).xyz);\n  vPosition = -center;\n\n  return center;\n}\n";
export default _default;