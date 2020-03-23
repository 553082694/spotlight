
const ShaderLab = {
    Spotlight: {
        vert: `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        attribute vec4 a_color;
        varying vec2 v_texCoord;
        varying vec4 v_fragmentColor;
        void main()
        {
            gl_Position = CC_PMatrix * a_position;
            v_fragmentColor = a_color;
            v_texCoord = a_texCoord;
        }
        `,
        frag: `
        #ifdef GL_ES
        precision highp float;
        #endif
        uniform vec2 resolution;
        uniform vec2 mouse;
        varying vec2 v_texCoord;
    
        void mainImage( out vec4 fragColor, in vec2 fragCoord )
        {
            // y坐标翻转
            vec2 imouse = vec2(mouse.x, resolution.y - mouse.y);
            // 纹理坐标
            vec2 uv = v_texCoord.xy;
            // 纹理采样
            vec4 tex = texture2D(CC_Texture0, uv);
            // 片元到鼠标点的差向量
            vec2 d = uv * resolution.xy - imouse.xy;
            // 光照半径
            vec2 s = 0.15 * resolution.xy;
            // 点积取比例
            float r = dot(d, d) / dot(s, s);

            float intensity = 0.5;
            if (1.08 - r > 0.0) {
                intensity = (1.08 - r) * 2.0;
            }
            if (intensity < 0.7) intensity = 0.7;
            fragColor = tex * intensity;
        }
        void main()
        {
            mainImage(gl_FragColor, gl_FragCoord.xy);
        }
        `
    }
};

export default ShaderLab;