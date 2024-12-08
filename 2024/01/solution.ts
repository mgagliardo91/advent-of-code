import { readFileSync } from 'fs'
import { join } from 'path'

class Solution {
  leftList: number[]
  rightList: number[]

  constructor(input: string) {
    [this.leftList, this.rightList] = this.parseInput(input)
  }

  private parseInput(input: string): [number[], number[]] {
    const [leftArray, rightArray] = input.split('\n').reduce<number[][]>((acc, line) => {
      const [leftIndex, rightIndex] = line.split('   ').map((index) => parseInt(index))
      acc[0].push(leftIndex)
      acc[1].push(rightIndex)
      return acc
    }, [[], []])

    return [leftArray, rightArray]
  }

  /**
   * Takes a multi-line string input, with each line containing two numbers to represent two values
   * in separate lists. This function will take the input and return total distance between
   * each value at the same index of each list, sorted ascending.
   */
  totalDistance(): number {
    let totalDistance = 0

    const leftList = [...this.leftList].sort()
    const rightList = [...this.rightList].sort()
    for (let i = 0; i < leftList.length; i++) {
      totalDistance += Math.abs(leftList[i] - rightList[i])
    }

    return totalDistance
  }

  simularity(): number {
    const indexCounts = this.rightList.reduce<{ [index: number]: number }>((acc, value) => {
      acc[value] = (acc[value] ?? 0) + 1
      return acc
    }, {})

    return this.leftList.reduce((acc, value) => {
      return acc + (value * (indexCounts[value] ?? 0))
    }, 0)
  }
}


const solution = new Solution(readFileSync(join(__dirname, 'input.txt')).toString())
console.log(solution.totalDistance())
console.log(solution.simularity())

// console.log(solutionPart1(readFileSync(join(__dirname, 'input.txt')).toString()))