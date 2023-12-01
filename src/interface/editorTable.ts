/****  Solid：实线 ****/
/****  Dash：划线段组成的实线 ****/
/****  Dot：由点组成的直线 ****/
/****  DashDot：重复的划线点图案组成的实线 ****/
/****  DashDotDot：重复的划线点点图案组成的实线 ****/
/****  Custom：自定义划线段样式 ****/
export enum LineStyle {
    SOLID = 'Solid',
    DASH = 'Dash',
    DOT = 'Dot',
    DASH_DOT = 'DashDot',
    DASH_DOT_DOT = 'DashDotDot',
    CUSTOM = 'Custom',
}

export interface ITableBorder {
    /****  是否设置左边框 ****/
    BorderLeft?: boolean;
    /****  是否设置上边框 ****/
    BorderTop?: boolean;
    /****  是否设置下边框 ****/
    BorderBotoom: boolean;
    /****  是否设置右边框 ****/
    BorderRight?: boolean;
    /****  枚举值	边框样式列表 ****/

    BorderStyle?: LineStyle;
    /****  边框粗细 ****/
    BorderWidth?: number;
    /****  左边框线颜色 ****/
    BorderLeftColor?: string;
    /****  上边框颜色 ****/
    BorderTopColor?: string;
    /****  下边框颜色 ****/
    BorderBotoomColor?: string;
    /****  右边框颜色 ****/
    BorderRightColor?: string;
}

/**
 * @description 单元格网格线配置
 */
export interface ICellGrid {
    /**** 文本行对齐到网格线 ****/
    AlignToGridLine: boolean;
    /**** 网格线颜色 ****/
    ColorValue: string;
    /**** 网格线之间的宽度 ****/
    GridSpanInCM: number;
    /**** 网格线样式 ****/
    LineStyle: LineStyle;
    /**** 网格线宽度 ****/
    LineWidth: number;
    /**** 打印预览是否显示 ****/
    Printable: boolean;
    /**** 网格是否显示 ****/
    Visible: boolean;
}
