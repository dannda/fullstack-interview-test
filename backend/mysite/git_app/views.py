import binascii
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from git import Repo, Commit
from git_app.models import PR
from git_app.serializers import PRSerializer

repo_dir = '/app/repo'
repo = Repo(repo_dir)
assert not repo.bare

def branches(request):
    branches_names = []
    print(repo.branches)
    for branch in repo.branches:
        branches_names.append(branch.name)
    return JsonResponse({'branches': branches_names})

def branch(request, branch_name):
    commits = []
    for commit in repo.iter_commits(branch_name):
        commits.append({
            'hexsha': commit.hexsha,
            'author': commit.author.name,
            'message': commit.message,
            'authored_datetime': commit.authored_datetime
        })
    return JsonResponse({'commits': commits})

def commit(request, commit_hexsha):
    binsha = binascii.unhexlify(commit_hexsha)
    commit = Commit(repo, binsha)
    details = {
        'hexsha': commit.hexsha,
        'author': commit.author.name,
        'message': commit.message,
        'authored_datetime': commit.authored_datetime,
        'files': [{'filename': key, 'changes': value} for key,value in commit.stats.files.items()],
        'author_email': commit.author.email
        }
    return JsonResponse({'commit': details})

def pr(request):
    data = PR.objects.all()
    if request.method == 'GET':
        serializer = PRSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

def pr_create(request):
    return 'create pr'
