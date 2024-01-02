export class StoryText {
    constructor (textAreaID) {
        this.textArea = document.getElementById(textAreaID);
        this.textArea.value = "Welcome to the Dungeon";
        this.textArea.scrollTop = this.textArea.scrollHeight
    }

    addLine(newLine) {
        this.textArea.value += '\n' + newLine;
        this.textArea.scrollTop = this.textArea.scrollHeight
    }
}