const getSettings = require('../src/controllers/api/getSettings');
const getBuilds = require('../src/controllers/api/getBuilds');
const getBuild = require('../src/controllers/api/getBuild');
const axios = require('axios');
const expectedSettings = require('./mocks/settings.json');
const expectedBuildsList = require('./mocks/buildsList.json');
const expectedBuildDetail = require('./mocks/buildDetail.json');

jest.mock('axios');

describe('Проверка API', () => {

  it('Получение настроек (getSettings)', async () => {
    const data = {
      "id": "0a0567e4-7de0-4d31-a668-b56b573e1651",
      "repoName": "https://github.com/khaledosman/react-redux-realworld-example-app",
      "buildCommand": "npm i && npm run build",
      "mainBranch": "master",
      "period": 0
    }

    const axisGetMock = axios.get.mockResolvedValue(expectedSettings);

    let expectedData;
    await getSettings({}, {
      json: (json) => {expectedData = json},
    });

    expect(expectedData).toEqual(data);

    axisGetMock.mockRestore();
  });

  it('Получение списка билдов (getBuilds)', async () => {
    const data = [
      {
        "id": "d30d3d38-990c-4dbc-9aa2-e2f2d8105c66",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 42,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:39:16.864",
        "duration": 119
      },
      {
        "id": "f7ede0d8-112d-4174-9760-87a47d3a6018",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 41,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:34:03.704",
        "duration": 125
      },
      {
        "id": "84450828-0251-48de-a51a-0354e4671dbc",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 40,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:33:29.602",
        "duration": 184
      },
      {
        "id": "0a659447-7018-48a4-9172-6819504bbcf2",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 39,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:31:44.258",
        "duration": 128
      },
      {
        "id": "f6224112-3dc8-43ed-b9db-4a3de9353073",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 38,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:30:26.75",
        "duration": 108
      },
      {
        "id": "9e203859-e268-49da-8d96-3019abc2a339",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 37,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:10:58.051",
        "duration": 135
      },
      {
        "id": "ee49a73f-0887-410a-befb-e93bf26106a0",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 36,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:09:18.561",
        "duration": 134
      },
      {
        "id": "7b28558b-0a08-4d2c-9d07-8a02e976dab8",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 35,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:07:24.291",
        "duration": 119
      },
      {
        "id": "733f7a31-ed0b-426c-bf94-8b1bbeb4845f",
        "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
        "buildNumber": 34,
        "commitMessage": "bump dependencies",
        "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
        "branchName": "master",
        "authorName": "Khaled Osman",
        "status": "Success",
        "start": "2021-07-02T14:04:25.176",
        "duration": 125
      }
    ]

    const axisGetMock = axios.get.mockResolvedValue(expectedBuildsList);

    let expectedData;
    await getBuilds({
      query: {
        offset: 0,
        limit: 9,
      }
    }, {
      json: (json) => {expectedData = json},
    });

    expect(expectedData).toEqual(data);

    axisGetMock.mockRestore();
  });

  it('Получение деталей билда (getBuild)', async () => {
    const data = {
      "id": "d30d3d38-990c-4dbc-9aa2-e2f2d8105c66",
      "configurationId": "0a0567e4-7de0-4d31-a668-b56b573e1651",
      "buildNumber": 42,
      "commitMessage": "bump dependencies",
      "commitHash": "0dfe95b7804d9e7eccb8d9ab6ddfca30519fc22a",
      "branchName": "master",
      "authorName": "Khaled Osman",
      "status": "Success",
      "start": "2021-07-02T14:39:16.864",
      "duration": 119
    }

    const axisGetMock = axios.get.mockResolvedValue(expectedBuildDetail);

    let expectedData;
    await getBuild({
      params: {
        buildId: 'd30d3d38-990c-4dbc-9aa2-e2f2d8105c66',
      }
    }, {
      json: (json) => {expectedData = json},
    });

    expect(expectedData).toEqual(data);

    axisGetMock.mockRestore();
  });

});
