import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.css']
})
export class HanoiComponent implements OnInit {

  pegs: number[][];

  numDiscs = 3;

  newDiscs = 3;

  hasSelected = false;

  selection: number

  victory = false;

  isSolving = false;

  paused = false;

  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  getHeight() {
    return ((1/this.numDiscs) * 100) + '%';
  }

  getWidth(index: number) {
    return ((index / this.numDiscs) * 100) + '%';
  }

  select(index: number) {
    if (!this.hasSelected) {
      this.selection = index;
    } else {
      this.move(this.selection, index);
    }
    this.hasSelected = !this.hasSelected;
  }

  move(pegFrom: number, pegTo: number) {
    if (this.peekTopDisc(pegFrom) > this.peekTopDisc(pegTo)) {
      return;
    }

    if (this.peekTopDisc(pegFrom) === Infinity) {
      return;
    }

    let disc = this.pegs[pegFrom].pop();

    this.pegs[pegTo].push(disc);

    if (this.pegs[2].length === this.numDiscs) {
      this.victory = true;
    }
  }

  peekTopDisc(peg: number) {
    if (this.pegs[peg].length === 0) {
      return Infinity;
    }

    return this.pegs[peg][this.pegs[peg].length - 1];
  }

  async solve() {
    this.isSolving = true;
    await this.solveRecursive(this.numDiscs, 0, 1, 2);
    this.isSolving = false;
  }

  async stop() {
    this.paused = true;
  }

  async resume() {
    this.paused = false;
  }

  async solveRecursive(n: number, src: number, via: number, dst: number) {
    if (n === 0 || !this.isSolving) {
      return;
    }

    await this.solveRecursive(n - 1, src, dst, via);
    if (this.isSolving) {
      await this.sleep(200);
      this.move(src, dst);
    }

    await this.solveRecursive(n - 1, via, src, dst);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  reset() {
    this.pegs = [[], [], []];

    this.numDiscs = this.newDiscs;

    for (let n = this.numDiscs; n > 0; n--) {
      this.pegs[0].push(n);
    }

    this.victory = false;
    this.paused = false;

    this.isSolving = false;
  }

}
