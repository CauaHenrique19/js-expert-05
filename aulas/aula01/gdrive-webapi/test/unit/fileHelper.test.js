import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from '../../src/routes.js'

describe('#FileHelper', () => {

    describe("#getFileStatus", () => {
        test("it should return files statuses in correct format", async () => {

            const statMock = {
                dev: 408656663,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 2533274790442503,
                size: 51939,
                blocks: 104,
                atimeMs: 1630974463458.3525,
                mtimeMs: 1628735476626.113,
                ctimeMs: 1628735478617.9417,
                birthtimeMs: 1630974430588.6865,
                atime: '2021-09-07T00:27:43.458Z',
                mtime: '2021-08-12T02:31:16.626Z',
                ctime: '2021-08-12T02:31:18.618Z',
                birthtime: '2021-09-07T00:27:10.589Z'              
            }

            const mockUser = 'cauah'
            process.env.USERNAME = mockUser
            const filename = 'eu.jpg'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFileStatus("/tmp")

            const expectedResult = [
                {
                    size: "51.9 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})
