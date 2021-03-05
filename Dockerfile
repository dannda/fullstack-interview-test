FROM python:3

WORKDIR /app

RUN git clone https://github.com/dannda/fullstack-interview-test.git ./repo && cd repo && for remote in $(git branch -r | grep -v -e "\->" -e master); do git branch --track ${remote#origin/} $remote; done && cd ..

RUN apt-get update && apt-get -y install nodejs npm && npm install angular-http-server -g && pip install -r /app/repo/requirements.txt

CMD ["bash", "-c", "sleep 1m"]
