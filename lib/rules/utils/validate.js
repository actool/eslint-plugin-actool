const commit1 = { author: "Ilya Azin", date: "2020-11-02 09:51:49+0300", commit: "b6988094" };
const commit2 = { author: "Ilya Azin", date: "2020-11-02 10:05:41+0300", commit: "a0e08b6b" };
const commit3 = { author: "Ilya Azin", date: "2020-11-02 11:51:49+0300", commit: "c6988094" };
const commit4 = { author: "Ilya Azin", date: "2020-11-02 13:40:49+0300", commit: "e0e08b6b" };
const commit5 = { author: "Ilya Azin", date: "2020-12-02 16:00:49+0300", commit: "f6988094" };
const commitsHistory = [
	commit1,
	commit2,
	commit3,
	commit4,
	commit5,
];

function validateDiff(commit1, commit2, diff) {
	commits = [];
	for (let commit in commitsHistory) {
		if (commit.date >= commit1.date && commit.date <= commit2.date){
			commits.push(commit)
		}
	}
	return commits.length <= diff ? true : false
}
function validateDiff(date1, date2, diff){
	timeWent = date2 - date1;
	return timeWent <= diff ? true : false
}
