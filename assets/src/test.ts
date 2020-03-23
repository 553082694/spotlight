import ShaderUtils from "./ShaderUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class test extends cc.Component {

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;

    @property(cc.Node)
    action: cc.Node = null;

    @property(cc.Node)
    spotlight: cc.Node = null;

    start() {
        this.action.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(1, 20), cc.rotateBy(2, -40), cc.rotateBy(1, 20))));
        ShaderUtils.spotlight(this.bg1, this.spotlight, this.bg1.getComponent(cc.Sprite));
        ShaderUtils.spotlight(this.bg2, this.spotlight, this.bg2.getComponent(cc.Sprite));
    }
}
