declare var _default: "uniform float worldUnit;\nuniform float lineDepth;\nuniform float lineWidth;\nuniform float focusDepth;\n\nuniform vec4 geometryClip;\nuniform float arrowSize;\nuniform float arrowSpace;\n\nattribute vec4 position4;\nattribute vec3 arrow;\nattribute vec2 attach;\n\n// External\nvec3 getPosition(vec4 xyzw, float canonical);\n\nvoid getArrowGeometry(vec4 xyzw, float near, float far, out vec3 left, out vec3 right, out vec3 start) {\n  right = getPosition(xyzw, 1.0);\n  left  = getPosition(vec4(near, xyzw.yzw), 0.0);\n  start = getPosition(vec4(far, xyzw.yzw), 0.0);\n}\n\nmat4 getArrowMatrix(vec3 left, vec3 right, vec3 start) {\n\n  float depth = focusDepth;\n  if (lineDepth < 1.0) {\n    // Depth blending\n    float z = max(0.00001, -right.z);\n    depth = mix(z, focusDepth, lineDepth);\n  }\n    \n  vec3 diff = left - right;\n  float l = length(diff);\n  if (l == 0.0) {\n    return mat4(1.0, 0.0, 0.0, 0.0,\n                0.0, 1.0, 0.0, 0.0,\n                0.0, 0.0, 1.0, 0.0,\n                0.0, 0.0, 0.0, 1.0);\n  }\n\n  // Construct TBN matrix around shaft\n  vec3 t = normalize(diff);\n  vec3 n = normalize(cross(t, t.yzx + vec3(.1, .2, .3)));\n  vec3 b = cross(n, t);\n  \n  // Shrink arrows when vector gets too small\n  // Approach linear scaling with cubic ease the smaller we get\n  float size = arrowSize * lineWidth * worldUnit * depth * 1.25;\n  diff = right - start;\n  l = length(diff) * arrowSpace;\n  float mini = clamp(1.0 - l / size * .333, 0.0, 1.0);\n  float scale = 1.0 - mini * mini * mini;\n  float range = size * scale;\n  \n  // Size to 2.5:1 ratio\n  float rangeNB = range / 2.5;\n\n  // Anchor at end position\n  return mat4(vec4(n * rangeNB,  0),\n              vec4(b * rangeNB,  0),\n              vec4(t * range, 0),\n              vec4(right,  1.0));\n}\n\nvec3 getArrowPosition() {\n  vec3 left, right, start;\n  \n  vec4 p = min(geometryClip, position4);\n  \n  getArrowGeometry(p, attach.x, attach.y, left, right, start);\n  mat4 matrix = getArrowMatrix(left, right, start);\n  return (matrix * vec4(arrow.xyz, 1.0)).xyz;\n\n}\n";
export default _default;
