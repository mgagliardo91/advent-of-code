import { readFileSync } from 'fs'
import { join } from 'path'

class Solution {
  levels: number[][]

  constructor(input: string) {
    this.levels = this.parseInput(input)
    console.log(this.levels)
  }

  private parseInput(input: string): number[][] {
    return input.split('\n').map((i) => i.split(' ').map((n) => parseInt(n)))
  }

  /**
   * Validates that each "level" (number in the same line) is safe, by means of:
   * - Either always increasing or always decreasing
   * - At least one away and at most 3 away from the next number
   */
  countSafeReports(): number {
    return this.levels.reduce<number>((acc, level) => {
      if (this.checkLevel(level)) {
        return acc + 1
      } else {
        return acc
      }
    }, 0);
  }

  /**
   * Validates that each "level" (number in the same line) is safe, by means of:
   * - Either always increasing or always decreasing
   * - At least one away and at most 3 away from the next number
   * 
   * ...allowing for one level to be "unsafe"
   */
  countSafeReportsWithDampener(): number {
    return this.levels.reduce<number>((acc, level) => {
      for (let i = -1; i < level.length; i++) {
        const newLevel = [...level]
        newLevel.splice(i, 1)
        if (this.checkLevel(newLevel)) {
          return acc + 1
        }
      }

      return acc
    }, 0);
  }

  private checkLevel(level: number[]): boolean {
    if (level.length < 2) {
      return true
    }

    let asc: boolean | undefined = undefined
    for (let index = 0; index < level.length - 1; index++) {
      const [isValid, direction] = this.checkLevels(level[index], level[index + 1], asc)
      if (isValid) {
        asc = direction
      } else {
        return false
      }
    }

    return true
  }

  private checkLevels(firstValue: number, secondValue: number, order: boolean | undefined): [boolean, boolean] {
    const difference = secondValue - firstValue
    let asc = order

    if (asc == undefined) { // Set order
      asc = difference > 0
    } else if (asc != difference > 0) { // Check order
      return [false, asc]
    }

    if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
      return [false, asc]
    }

    return [true, asc]
  }

}

const solution = new Solution(readFileSync(join(__dirname, 'input.txt')).toString())
console.log(solution.countSafeReports())
console.log(solution.countSafeReportsWithDampener())