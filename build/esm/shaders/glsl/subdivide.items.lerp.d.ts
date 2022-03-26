declare var _default: "uniform float subdivideBevel;\n\n// External\nvec4 sampleData(vec4 xyzw);\n\nvec4 subdivideItemsLerp(vec4 xyzw) {\n  float x = xyzw.w;\n  float i = floor(x);\n  float f = x - i;\n\n  float minf = subdivideBevel * min(f, 1.0 - f);\n  float g = (f > 0.5) ? 1.0 - minf : (f < 0.5) ? minf : 0.5;\n\n  vec4 xyzw1 = vec4(xyzw.xyz, i);\n  vec4 xyzw2 = vec4(xyzw.xyz, i + 1.0);\n  \n  vec4 a = sampleData(xyzw1);\n  vec4 b = sampleData(xyzw2);\n\n  return mix(a, b, g);\n}\n";
export default _default;
