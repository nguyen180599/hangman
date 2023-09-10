import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WordInterface} from "./word.model";
import {FEELING_LIST, FRUIT_LIST, GAME_LIST, MUSIC_LIST} from "./wordList.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('input', {read: ElementRef}) input!: ElementRef
  word: string[] = [];
  wordSelect: WordInterface = Object.assign({});
  words: WordInterface[] = GAME_LIST;
  isAll: boolean = false;
  errCount = 0;
  correctKey: string[] = [];
  failKey: string[] = [];
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  point: { point: number, color: string }[] = [{
    point: 0, color: 'red-500'
  }, {
    point: 0, color: 'blue-500'
  }, {
    point: 0, color: 'yellow-500'
  }, {
    point: 0, color: 'fuchsia-500'
  }];

  team = this.point[0];

  constructor() {
  }

  ngOnInit() {
    this.selectWord();
  }

  chon_chu_de(key: any) {
    console.log(key)
    switch (key) {
      case "game":
        this.words = GAME_LIST
        break;
      case "feeling":
        this.words = FEELING_LIST
        break;
      case "fruit":
        this.words = FRUIT_LIST
        break;
      case "music":
        this.words = MUSIC_LIST
        break;
    }

    this.selectWord();
  }

  selectWord() {
    const length = this.words.length;
    const workSelectIndex = this.randomIntFromInterval(0, length - 1);
    if (!length) {
      this.isAll = true;
      return;
    }

    this.errCount = 0;
    if (this.input) {
      this.input.nativeElement.style = 'color: black';
      this.input.nativeElement.value = ''
    }
    this.wordSelect = this.words.splice(workSelectIndex, 1)[0];
    this.word = this.wordSelect.en.split('').map(word => {
      if (word === ' ') {
        return ' '
      }
      return '_'
    });
    this.correctKey = [];
    this.failKey = [];

    console.log(this.wordSelect)
  }

  check(key: string, isFull?: boolean) {
    if (!key) {
      return
    }

    if (isFull) {
      if (key.toUpperCase() === this.wordSelect.en.toUpperCase()) {
        this.word = key.toUpperCase().split('');
        this.team.point += 1;
      } else {
        this.showWord();
        this.input.nativeElement.style = 'color: red';
        this.errCount = 8;
      }
      return;
    }

    if (!this.wordSelect.en.toUpperCase().includes(key)) {
      this.errCount += 1;
      this.failKey.push(key);
      if (this.errCount === 8) {
        this.showWord();
      }
      return;
    }

    const indexes: number[] = this.indexesOf(this.wordSelect.en, key);
    indexes.forEach(index => {
      this.word[index] = key;
    })
    this.correctKey.push(key);
    if (!this.word.includes('_')) {
      this.team.point += 1;
    }
  }

  showWord() {
    this.word = this.wordSelect.en.split('')
  }

  inputValidate(input: HTMLInputElement) {
    input.value = input.value.toUpperCase();
    if ([...this.correctKey, ...this.failKey].includes(input.value)) {
      input.value = '';
    }
  }

  private randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private indexesOf(string: string, searchString: string) {
    let indexes: number[] = [];
    let matches = [...string
      .toUpperCase()
      .matchAll(new RegExp(searchString.toUpperCase(), 'g')),];
    matches.forEach((match) => {
      if (match.index || match.index == 0) indexes.push(match.index);
    });

    return indexes;
  }
}
