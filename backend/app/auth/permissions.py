from fastapi import HTTPException, status


def require_role(
    current_user,
    allowed_roles: list[str],
):

    if current_user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )

    if current_user.role not in allowed_roles:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission",
        )

    return current_user