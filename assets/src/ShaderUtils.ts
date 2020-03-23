import ShaderLab from "./ShaderLab";

export default class ShaderUtils {
    public static spotlight(node, mouseNode, sprite) {
        let program = new cc.GLProgram()

        let resolution = { x: 0.0, y: 0.0 };
        let mouse = { x: 0.0, y: 0.0 };
        resolution.x = node.getContentSize().width;
        resolution.y = node.getContentSize().height;
        mouse.x = node.convertToNodeSpaceAR(mouseNode.parent.convertToWorldSpaceAR(mouseNode.position)).x + node.getContentSize().width / 2;
        mouse.y = node.convertToNodeSpaceAR(mouseNode.parent.convertToWorldSpaceAR(mouseNode.position)).y + node.getContentSize().height / 2;
        if (cc.sys.isNative) {
            program.initWithString(ShaderLab.Spotlight.vert, ShaderLab.Spotlight.frag);
        } else {
            program.initWithVertexShaderByteArray(ShaderLab.Spotlight.vert, ShaderLab.Spotlight.frag);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        program.link();
        program.updateUniforms();
        program.use();
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            glProgram_state.setUniformVec2("resolution", resolution);
            glProgram_state.setUniformVec2("mouse", mouse);
            sprite._sgNode.setGLProgramState(glProgram_state);
        } else {
            let res = program.getUniformLocationForName("resolution");
            let ms = program.getUniformLocationForName("mouse");
            program.setUniformLocationWith2f(res, resolution.x, resolution.y);
            program.setUniformLocationWith2f(ms, mouse.x, mouse.y);
            sprite._sgNode.setShaderProgram(program);
        }
    }
}