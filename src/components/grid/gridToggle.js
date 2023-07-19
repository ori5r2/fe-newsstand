import { GRID_SIZE, SNACK_BAR_TIME } from "../../utils/constant.js";
import { press_list } from "../../../data/pressList.js";
import { class_name } from "../../utils/domClassName.js";
import { subscribe_press_list, press_idx } from "../../../data/subscribeIdxList.js";
import { createMainGrid } from "../../container/gridViewTemplate.js";
import { onClickSubBtn } from "../layout/mainNavEvent.js";
import { createSnackBar } from "../common/snackBar.js";

class gridViewInfo {
    constructor(data, isSub) {
        this.current_page = 0;
        this.data = data;
        this.left_btn_name = `.${class_name.GRID_LEFT_BTN}-${isSub}`;
        this.right_btn_name = `.${class_name.GRID_RIGHT_BTN}-${isSub}`;
        this.class_name = `.grid-${isSub}`;
    }

    getCurrentPage = function () {
        return this.current_page;
    };

    getMaxPage = function () {
        return Math.ceil(this.data.length / GRID_SIZE) - 1;
    };

    getData = function () {
        return this.data.map((idx) => {
            return press_list[idx - 1];
        });
    };

    getLeftBtn = function () {
        return this.left_btn_name;
    };

    getRightBtn = function () {
        return this.right_btn_name;
    };

    getClassName = function () {
        return this.class_name;
    };

    setPage = function (isRight) {
        isRight ? (this.current_page += 1) : (this.current_page -= 1);
    };
}

// grid view page 정보 (main)
class gridViewEntire extends gridViewInfo {
    update = function (state) {
        createMainGrid(this, false, state);
    };
}
export const grid_view_info_entire = new gridViewEntire(
    press_idx.slice().sort(() => Math.random() - 0.5),
    class_name.ENTIRE
);

// grid view page 정보 (sub)
class gridViewSub extends gridViewInfo {
    update = function (state) {
        this.data = state;
        if (this.getCurrentPage() > this.getMaxPage() && this.getMaxPage() >= 0) {
            this.setPageNum(this.getMaxPage());
        }
        createMainGrid(this, false, state);
    };

    setPageNum = function (page_num) {
        this.current_page = page_num;
    };
}
export const grid_view_info_sub = new gridViewSub([], class_name.SUBSCRIBE);

// 페이지 넘길 때 첫번째 마지막 페이지 화살표 숨김
export function toggleArrow(grid_view_info) {
    const left_btn = document.querySelector(grid_view_info.getLeftBtn());
    const right_btn = document.querySelector(grid_view_info.getRightBtn());
    const current_page = grid_view_info.getCurrentPage();
    const max_page = grid_view_info.getMaxPage();
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
    if (current_page <= 0) left_btn.style.visibility = "hidden";
    if (current_page >= max_page) right_btn.style.visibility = "hidden";
}
