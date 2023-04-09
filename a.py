def solve(A,B):
    count = 0
    for i in range(0,len(A)):
        for j in range(i,len(A)):
            if B in A[i:j+1]:
                count+=1
    return count

            