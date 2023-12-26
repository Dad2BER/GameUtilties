export class StoryText {
    constructor (textAreaID) {
        this.textArea = document.getElementById(textAreaID);
        this.textArea.value = "Welcome to the Dungeon";
    }

    addLine(newLine) {
        this.textArea.value += '\n' + newLine;
    }
}