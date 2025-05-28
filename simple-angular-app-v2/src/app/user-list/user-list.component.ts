import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  // Variable for the user name input
  newUser: string = '';
  // Variable for displaying feedback messages
  message: string = '';
  // Observable holding the list of users
  users$!: Observable<IUser[]>;

  constructor(private userService: UserService) {
    // Pre-load users on component initialization
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getUsers().pipe(
      tap(users => console.log('Fetched users:', users))
    );
  }

  // Adds a new user by calling the UserService, if the input is valid.
  addUser(): void {
    if (this.newUser && this.newUser.trim().length > 0) {
      const payload = {
        name: this.newUser.trim(),
        email: `${this.newUser.trim()}@example.com`
      };
      this.userService.addUser(payload).subscribe({
        next: (createdUser) => {
          // Set a feedback message upon successful addition
          this.message = `User "${createdUser.name}" added successfully.`;
          console.log('User added:', createdUser);
          // Refresh the user list
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error adding user:', err);
          this.message = 'Error adding user.';
        }
      });
      // Reset the input field after attempting to add the user
      this.newUser = '';
    }
  }

    deleteUser(user: IUser): void {
    if (!user.id) {
      this.message = 'Cannot delete user: missing ID.';
      return;
    }
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.message = `User "${user.name}" deleted successfully.`;
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.message = `Error deleting user "${user.name}".`;
      }
    });
  }
  
}