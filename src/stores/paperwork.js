import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";

export const formStore = defineStore("personalForm", {
    state: () => ({
        name: useStorage("name", ""),
        badgeNumber: useStorage("badgeNumber", "00000"),
        darkMode: useStorage("darkMode", false),
        divisionLineArray: useStorage("divisionLineArray", [
            {
                content: "",
                line: 1,
            },
        ]),
        divisionLineLabel: "Division",
        divisionLinePlaceholder: "Bureau - Division - Position",
        rank: useStorage("rank", ""),
        servingTime: useStorage("servingTime", ""),
        showDivisionalPopupError: false,
    }),
    actions: {
        /**
         * Adds a new row to the end of the DivisionLine Array
         */
        addNewDivisionLine() {
            const divisionLineArr = this.divisionLineArray;
            const { line } = divisionLineArr[divisionLineArr.length - 1];
            return this.divisionLineArray.push({
                content: "",
                line: line + 1,
            });
        },
        /**
         * Removes the last row at the end of the DivisionalLineArray
         */
        removeDivisionLine() {
            return (
                this.divisionLineArray.length > 1 &&
                this.divisionLineArray.pop()
            );
        },
        /**
         * Removes the item from the divisionLineArray, then maps through the array
         * and updates the index
         *
         * @param {Number} index The division line index
         */
        removeCurrentDivisionLine(itemIndex) {
            if (this.divisionLineArray.length > 1) {
                this.divisionLineArray = this.divisionLineArray.filter(
                    (item, index) => index !== itemIndex
                );

                // Map through the divisionLineArray and update the line value
                return this.divisionLineArray.map(({ line }, index) => {
                    if (line > 1) {
                        this.divisionLineArray[index].line = index;
                    }
                });
            } else {
                alert("You cannot delete the last item");
            }
        },
        toggleDivisionPopup(show = false) {
            console.log(this.toggleDivisionPopup);
            this.showDivisionalPopupError = show;
        },
        updateState({ field, value }) {
            return (this[field] = value);
        },
        updateArray({ field, value }) {
            const index = field - 1;
            return (this.divisionLineArray[index].content = value);
        },
    },
});
