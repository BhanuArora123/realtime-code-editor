#include <bits/stdc++.h>
using namespace std;
void solve(vector<int>&v1,int i , int j){
  if(i > j){
    return;
  }
  int temp = v1[i];
  v1[i] = v1[j];
  v1[j] = temp;
  solve(v1,i+1,j-1);
}
int main(void){
  int n;
  cin>>n;
  vector<int>v1;
  for(int i = 0;i<n;i++){
    int a;
    cin>>a;
    v1.push_back(a);
  }
  solve(v1,0,n-1);
  for(auto ele : v1){
    cout<<ele<<" ";
  }
  return 0;
}