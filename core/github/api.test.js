import API from './api';
jest.mock('./api');

describe('Mock API class', () => {
  it('Get Job by id', () => {
      API.getJob(2)

      expect(API.getJob).toHaveBeenCalled();
      expect(API.getJob).toHaveBeenCalledWith(2);
      expect(API.getJob).toHaveBeenCalledTimes(1);
  });

  it('get jobs', () => {
    API.getJobs('Javascript', 'New York', 'on');

    expect(API.getJobs).toHaveBeenCalled();
    expect(API.getJobs).toHaveBeenCalledWith('Javascript', 'New York', 'on');
    expect(API.getJobs).toHaveBeenCalledTimes(1);
  });
});